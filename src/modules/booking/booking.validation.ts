import { z } from 'zod';

const bookingSignUpValidationSchema = z.object({
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

const bookingSignInValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

export const userValidations = {
    bookingSignUpValidationSchema,
    bookingSignInValidationSchema,
};
