'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
	children: React.ReactNode;
	mode?: 'modal' | 'redirect';
	asChild?: boolean;
}

export const LoginButton = ({
	children,
	mode = 'redirect',
	asChild = false,
}: LoginButtonProps) => {
	const router = useRouter();

	const clickHandler = () => {
		router.push('/auth/login');
	};

	if (mode === 'modal') {
		return <span>TO DO: Implement modal</span>;
	}

	return (
		<span onClick={clickHandler} className='cursor-pointer'>
			{children}
		</span>
	);
};
