'use client';

import { settings } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut, useSession } from 'next-auth/react';
import { useTransition } from 'react';

const SettingsPage = () => {
	const [isPending, startTransition] = useTransition();
	// is using to update session after change data in db
	const { update } = useSession();
	const onClick = () => {
		startTransition(() => {
			settings({ name: 'new name' }).then(() => update());
		});
	};

	return (
		<Card className='w-[600px]'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'> Settings</p>
			</CardHeader>
			<CardContent>
				<Button disabled={isPending} onClick={onClick}>
					Update Name
				</Button>
			</CardContent>
		</Card>
	);
};
export default SettingsPage;
