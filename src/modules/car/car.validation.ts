import { z } from 'zod';
import { carStatus } from './car.constant';

const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        description: z.string({
            required_error: 'Description is required',
        }),
        color: z.enum([...carStatus] as [string, ...string[]], {
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

// const userSignInValidationSchema = z.object({
//     body: z.object({
//         email: z.string({
//             required_error: 'Email is required',
//         }),
//         password: z.string({
//             required_error: 'Password is required',
//         }),
//     }),
// });

export const carValidations = {
    createCarValidationSchema,
};
