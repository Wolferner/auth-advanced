'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();

	if (!user || !user.id) {
		return { error: 'Unauthorized user' };
	}

	const dbUser = await getUserById(user.id);
	if (!dbUser) {
		return { error: 'Unauthorized in db' };
	}

	// check if user is 0Auth than he cant change part of settings
	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}

	// if user want to change email we check if email is not in use and send verification email
	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);
		if (existingUser && existingUser.id !== user.id) {
			return { error: 'Email already in use' };
		}

		const verificationToken = await generateVerificationToken(values.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);

		return { success: 'Verification email sent' };
	}

	//checking of password and newPassword and if they are correct, if correct then password is hashed and saved in db
	if (values.password && values.newPassword && dbUser.password) {
		const passwordMatch = await bcrypt.compare(
			values.password,
			dbUser.password
		);
		if (!passwordMatch) {
			return { error: 'Password is incorrect' };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});

	return { success: 'settings updated' };
};
