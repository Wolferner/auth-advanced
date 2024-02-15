import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';
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
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
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
			//Prevent Sign In without Email verification
			if (user && user.id) {
				const existingUser = await getUserById(user.id);
				if (!existingUser?.emailVerified) return false;
			}

			//TODO: Add 2FA check

			return true;
		},
		async jwt({ token }) {
			if (!token.sub) return token;

			//TODO: Its posible to get user info with {user} argument in jwt function
			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;

			token.role = existingUser.role;
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
			console.log('session', session);
			return session;
		},
	},
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},
	...authConfig,
});
