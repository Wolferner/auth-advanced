'use client';

import { useCurrentRole } from '@/hooks/use-current-role';

const AdminPage = () => {
	const role = useCurrentRole();
	return <div>{role}</div>;
};

export default AdminPage;
