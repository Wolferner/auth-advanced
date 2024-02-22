import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import AzureADB2C from 'next-auth/providers/azure-ad-b2c';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { getUserByEmail } from './data/user';
import { LoginSchema } from './schemas';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);
					if (!user || !user.password) {
						return null;
					}

					const passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) return user;
				}

				return null;
			},
		}),
		GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		AzureADB2C({
			clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
			clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
			// issuer:
			// 'https://testadvancedauth.b2clogin.com/testAdvancedAuth.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_signup_signin1',

			tenantId: process.env.AZURE_AD_B2C_TENANT_ID,
			primaryUserFlow: process.env.AZURE_AD_B2C_USER_FLOW,
		}),
	],
} satisfies NextAuthConfig;
