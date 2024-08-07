import { z } from 'zod';
import { carStatus } from './car.constant';

// create car validation
const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        description: z.string({
            required_error: 'Description is required',
        }),
        color: z.string({
            required_error: 'Color is required',
        }),
        isElectric: z.boolean({
            required_error: 'isElectric is required',
        }),
        status: z
            .enum([...carStatus] as [string, ...string[]])
            .default('available'),
        features: z.array(
            z.string({
                required_error: 'Features is required',
            }),
        ),
        pricePerHour: z.number({
            required_error: 'Price Per Hour is required',
        }),
    }),
});

// update car validation
const updateCarValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        color: z.string().optional(),
        isElectric: z.boolean().optional(),
        status: z.enum([...carStatus] as [string, ...string[]]).optional(),
        features: z.array(z.string()).optional(),
        pricePerHour: z.number().optional(),
    }),
});

export const CarValidations = {
    createCarValidationSchema,
    updateCarValidationSchema,
};
