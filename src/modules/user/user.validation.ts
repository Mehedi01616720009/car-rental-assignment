import { z } from 'zod';

// user signup validation
const userSignUpValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z.string({
            required_error: 'Email is required',
        }),
        role: z.enum(['admin', 'user'], {
            required_error: 'Role is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
        phone: z.string({
            required_error: 'Phone is required',
        }),
        address: z.string({
            required_error: 'Address is required',
        }),
    }),
});

// user signin validation
const userSignInValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

// user refresh token validation
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Token is required',
        }),
    }),
});

export const UserValidations = {
    userSignUpValidationSchema,
    userSignInValidationSchema,
    refreshTokenValidationSchema,
};
