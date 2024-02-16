'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { LoginForm } from './login-form';

interface LoginButtonProps {
	children: React.ReactNode;
	mode: 'modal' | 'redirect';
	// asChild?: boolean;
}

export const LoginButton = ({
	children,
	mode,
}: // asChild = false,
LoginButtonProps) => {
	const router = useRouter();

	const clickHandler = () => {
		router.push('/auth/login');
	};

	if (mode === 'modal') {
		return (
			<Dialog>
				<DialogTrigger asChild={true}>{children}</DialogTrigger>
				<DialogContent className='p-0 w-auto bg-transparent border-none'>
					<LoginForm />
				</DialogContent>
			</Dialog>
		);
	} else if (mode === 'redirect') {
		return (
			<span onClick={clickHandler} className='cursor-pointer'>
				{children}
			</span>
		);
	} else {
		return <span>Invalid atribute - need set mode in login-button.tsx!</span>;
	}
};
