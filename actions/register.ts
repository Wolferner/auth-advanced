'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import * as z from 'zod';

import { getUserByEmail } from '@/data/user';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'invalid fields!' };
	}

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'User already exists!' };
	}

	await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	});

	//TODO: send email

	return { success: 'User created' };
};
