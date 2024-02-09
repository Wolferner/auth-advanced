'use client';

import CardWrapper from './card-wrapper';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';

export const LoginForm = () => {
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
				<form className='space-y-6' onSubmit={form.handleSubmit(() => {})}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='example@example.com'
											type='email'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
