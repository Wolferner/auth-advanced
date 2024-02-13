import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';

// import authConfig from './auth.config';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [GitHub],
	// session: {
	// 	strategy: 'jwt',
	// },
	// ...authConfig,
});
