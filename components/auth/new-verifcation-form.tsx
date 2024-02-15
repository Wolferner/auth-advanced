'use client';
import { newVerification } from '@/actions/new-verification';
import CardWrapper from '@/components/auth/card-wrapper';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

export const NewVerificationForm = () => {
	const [error, setError] = useState<string | undefined>(undefined);
	const [success, setSuccess] = useState<string | undefined>(undefined);
	const searchParams = useSearchParams();

	const token = searchParams.get('token');

	const onSubmit = useCallback(() => {
		if (!token) {
			setError('Missing token');
			return;
		}
		newVerification(token)
			.then(data => {
				setSuccess(data.success);
				setError(data.error);
			})
			.catch(error => {
				setError('Something go wrong');
			});
	}, [token]);

	useEffect(() => {
		onSubmit();
	}, []);

	return (
		<CardWrapper
			headerLabel='Confirming your email'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<div className='flex items-center w-full justify-center'>
				{!success && !error && <BeatLoader />}
				<FormSuccess message={success} />
				<FormError message={error} />
			</div>
		</CardWrapper>
	);
};
