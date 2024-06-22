import { z } from 'zod';

const bookingSetValidationSchema = z.object({
    body: z.object({
        date: z.string({
            required_error: 'Date is required',
        }),
        car: z.string({
            required_error: 'Car is required',
        }),
        startTime: z.string({
            required_error: 'Start Time is required',
        }),
    }),
});

const bookingEndValidationSchema = z.object({
    body: z.object({
        endTime: z.string({
            required_error: 'End Time is required',
        }),
    }),
});

export const BookingValidations = {
    bookingSetValidationSchema,
    bookingEndValidationSchema,
};
