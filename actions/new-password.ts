'use server';

import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token?: string | null
) => {
	if (!token) {
		return { error: 'Token is required' };
	}
	const validatedFields = NewPasswordSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);
	if (!existingToken) {
		return { error: 'Token not found' };
	}

	const hasExpired = new Date() > new Date(existingToken.expires);
	if (hasExpired) {
		return { error: 'Token has expired' };
	}

	const existingUser = await getUserByEmail(existingToken.email);
	if (!existingUser) {
		return { error: 'User not found' };
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	await db.user.update({
		where: {
			id: existingUser.id,
		},
		data: {
			password: hashedPassword,
		},
	});

	return { success: 'Password updated' };
};
