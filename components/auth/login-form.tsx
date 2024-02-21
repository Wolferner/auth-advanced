'use client';

import { login } from '@/actions/login';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const urlError =
		searchParams.get('error') === 'OAuthAccountNotLinked'
			? 'Email already in use with other provider2'
			: '';

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [showTwoFactor, setShowTwoFactor] = useState(false);

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() => {
			login(values, callbackUrl)
				.then(data => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}
					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError('Something went wrong'));
		});
	};

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel='Dont have an account?'
			backButtonHref='/auth/register'
			showSocial
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						{showTwoFactor && (
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<Input
												disabled={isPending}
												{...field}
												placeholder='123456'
												type='string'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													disabled={isPending}
													{...field}
													placeholder='example@example.com'
													type='email'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
											<Button
												size='sm'
												variant='link'
												asChild
												className='px-0 font-normal'
											>
												<Link href='/auth/reset'>Forgot password?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type='submit' className='w-full'>
						{!showTwoFactor ? 'Login' : 'Confirm'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
