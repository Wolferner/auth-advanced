export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * Array of authentication routes.
 * @type {string[]}
 */
export const authRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
	'/auth/reset',
	'/auth/new-password',
];

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/settings';
