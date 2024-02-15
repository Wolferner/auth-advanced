'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut, useSession } from 'next-auth/react';

const SettingsPage = () => {
	const user = useCurrentUser();

	return (
		<div>
			<button onClick={() => signOut()} type='button'>
				Sign Out
			</button>
		</div>
	);
};
export default SettingsPage;
