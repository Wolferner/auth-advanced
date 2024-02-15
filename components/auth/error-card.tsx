import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import BackButton from './back-button';
import CardWrapper from './card-wrapper';
import { Header } from './header';

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel='Something went wrong!'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<div className='w-full flex justify-center items-center'>
				<ExclamationTriangleIcon className='text-destructive' />
			</div>
		</CardWrapper>
	);
};
