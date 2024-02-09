export const publicRoutes = ['/'];

/**
 * Defines the authentication routes. Which will be redirected to the default login redirect path if the user is already logged in.
 */
export const authRoutes = [
	'/api/auth/signin',

	// '/api/auth/callback/credentials',
];

/**
 * The prefix for API authentication routes.
 */
export const apiAuthPrefix = '/api/auth/';

/**
 * The default login redirect path.
 */
export const DEFAULT_LOGIN_REDIRECT = '/SecuredPage';
