'use server';

import * as z from 'zod';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/mail';
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'invalid fields!' };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email does not exist !' };
	}
	// not allowed to sign in if email is not verified
	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);
		return { success: 'Confirmation email sent!' };
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			//TODO: Check if code is valid
		} else {
			const twoFactorToken = await generateTwoFactorToken(existingUser.email);

			await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);

			return { twoFactor: true };
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'invalid credentials!' };
				default:
					return { error: 'unknown error!' };
			}
		}
		throw error;
	}
};
