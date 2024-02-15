'use client';

import { newPassword } from '@/actions/new-password';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';

export const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() => {
			newPassword(values, token).then(data => {
				if (data) {
					setError(data.error);
					setSuccess(data.success);
				}
			});
		});
	};

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	});

	return (
		<CardWrapper
			headerLabel='Enter a new password'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											{...field}
											placeholder='******'
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type='submit' className='w-full'>
						Reset password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
