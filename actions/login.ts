'use server';

import * as z from 'zod';

import { signIn } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/teo-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/lib/mail';
import {
	generateTwoFactorToken,
	generateVerificationToken,
} from '@/lib/tokens';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';

export const login = async (
	values: z.infer<typeof LoginSchema>,
	callbackUrl?: string | null
) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'invalid fields!' };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !existingUser.email || !existingUser.password) {
		return { error: 'Email or password is wrong !' };
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
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken) {
				return { error: '2FA fail - please contact admin !' };
			}

			if (twoFactorToken.token !== code) {
				return { error: '2FA fail - please contact admin !' };
			}

			const hasExpires = new Date(twoFactorToken.expires) < new Date();
			if (hasExpires) {
				return { error: 'Code expired!' };
			}

			await db.twoFactorToken.delete({
				where: {
					id: twoFactorToken.id,
				},
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id
			);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: {
						id: existingConfirmation.id,
					},
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
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
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				// To check scenario when user is not found
				case 'CredentialsSignin':
					console.log(error.type);
					return { error: 'wrong email or password!' };
				default:
					console.log(error.type);
					return { error: 'Unexpected error!' };
			}
		}
		throw error;
	}
};
