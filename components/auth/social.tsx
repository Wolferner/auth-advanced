'use client';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { VscAzure } from 'react-icons/vsc';
import { Button } from '../ui/button';

export type ProviderType = 'google' | 'github' | 'azure-ad-b2c';

const Social = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	// debugger;
	const onClick = (provider: ProviderType) => {
		// debugger;
		signIn(provider, {
			callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		});
	};

	return (
		<div className='flex items-center w-full gap-x-4'>
			<Button
				size='lg'
				variant='outline'
				className='w-full'
				onClick={() => onClick('google')}
			>
				<FcGoogle className='h-5 w-5' />
			</Button>
			<Button
				size='lg'
				variant='outline'
				className='w-full'
				onClick={() => onClick('github')}
			>
				<FaGithub className='h-5 w-5' />
			</Button>
			<Button
				size='lg'
				variant='outline'
				className='w-full'
				onClick={() => onClick('azure-ad-b2c')}
			>
				<VscAzure className='h-5 w-5 text-blue-600' />
			</Button>
		</div>
	);
};
export default Social;
