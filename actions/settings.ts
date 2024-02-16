'use server';

import { getUserByEmail } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import * as z from 'zod';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await currentUser();

	if (!user || !user.id) {
		return { error: 'Unauthorized' };
	}

	const dbUser = await getUserByEmail(user.id);
	if (!dbUser) {
		return { error: 'Unauthorized' };
	}

	await db.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});

	return { success: 'settings updated' };
};
