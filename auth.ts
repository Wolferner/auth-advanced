import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import { FaLaptopHouse } from 'react-icons/fa';
import authConfig from './auth.config';
import { getAccountByUserId } from './data/account';
import { getTwoFactorConfirmationByUserId } from './data/teo-factor-confirmation';
import { getUserById } from './data/user';
import { db } from './lib/db';

// declare module 'next-auth' {
// 	interface Session {
// 		user: {
// 			role: 'ADMIN' | 'USER';
// 		};
// 	}
// }

// import { JWT } from 'next-auth/jwt';
// declare module 'next-auth/jwt' {
// 	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
// 	interface JWT {
// 		role?: 'ADMIN' | 'USER';
// 	}
// }

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},

	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: {
					emailVerified: new Date(),
				},
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			//Allow OAuth without email verification
			if (account?.provider !== 'credentials') return true;

			if (!user || !user.id) return false;

			//Prevent Sign In without Email verification
			const existingUser = await getUserById(user.id);
			if (!existingUser?.emailVerified) return false;

			//2FA check
			if (existingUser.isTwoFactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
					existingUser.id
				);

				if (!twoFactorConfirmation) return false;

				//Delete 2FA confirmation for next sign in
				await db.twoFactorConfirmation.delete({
					where: {
						id: twoFactorConfirmation.id,
					},
				});
			}

			return true;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			//TODO: Its posible to get user info with {user} argument in jwt function
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			//get account to check if user is 0Auth
			const existingAccount = await getAccountByUserId(existingUser.id);

			//add user info to jwt from db to implement changing user data
			token.name = existingUser.name;
			token.email = existingUser.email;

			token.is0Auth = !!existingAccount;
			token.role = existingUser.role;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

			console.log('jwt token', token);

			return token;
		},

		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role as UserRole;
			}
			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}
			// console.log('session', session);

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email as string;
				session.user.is0Auth = token.is0Auth as boolean;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	...authConfig,
});
