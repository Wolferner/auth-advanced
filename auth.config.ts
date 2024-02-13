import type { NextAuthConfig, User } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

export default {
	providers: [
		GitHub,
		// 		Credentials({
		// 			name: 'Credentials',
		// 			credentials: {
		// 				email: { label: 'Username', type: 'text' },
		// 				password: { label: 'Password', type: 'password' },
		// 			},
		// 			async authorize(credentials) {
		// 				const user = {
		// 					password: credentials.password,
		// 					email: credentials.email,
		// 				};

		// 				if (user && user.email && user.password) {
		// 					return user as User;
		// 				} else {
		// 					return null;
		// 				}
		// 			},
		// 		}),
	],
} as NextAuthConfig;
