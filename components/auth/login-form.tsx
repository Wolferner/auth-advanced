'use client';

import CardWrapper from './card-wrapper';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { login } from '@/actions/login';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useState, useTransition } from 'react';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');

		//FIXME: This is a workaround for the issue with useTransition
		login(values).then(data => {
			setError(data.error);
			setSuccess(data.success);
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
