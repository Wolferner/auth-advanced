'use server';

import { getUserByEmail } from '@/data/user';
import { ResetSchema } from '@/schemas';
import * as z from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validateFields = ResetSchema.safeParse(values);
	if (!validateFields.success) {
		return { error: 'invalid Email' };
	}

	const { email } = validateFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: 'User not found' };
	}

	//TODO: Send reset email

	return { success: 'Reset email sent' };
};
