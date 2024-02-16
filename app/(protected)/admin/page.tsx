'use client';

import { admin } from '@/actions/admin';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

const AdminPage = () => {
	const onServerActionClick = async () => {
		admin().then(res => {
			if (res.success) {
				toast.success('Success');
			}
			if (res.error) {
				toast.error('Failed');
			}
		});
	};

	const onApiRouteClick = async () => {
		fetch('/api/admin').then(res => {
			if (res.ok) {
				toast.success('Success');
			} else {
				toast.error('Failed');
			}
		});
	};

	return (
		<Card className='w-[600px] '>
			<CardHeader className='text-2xl font-semibold text-center'>
				Admin
			</CardHeader>
			<CardContent className='space-y-4'>
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message='You have permission' />
				</RoleGate>
				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
					<p className='text-sm font-medium'>Admin Only Api Route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>
				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
					<p className='text-sm font-medium'>Admin Only Server Action</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminPage;
