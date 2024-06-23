import { z } from 'zod';

const bookingSetValidationSchema = z.object({
    body: z.object({
        date: z.string({
            required_error: 'Date is required',
        }),
        carId: z.string({
            required_error: 'Car is required',
        }),
        startTime: z.string({
            required_error: 'Start Time is required',
        }),
    }),
});

const bookingEndValidationSchema = z.object({
    body: z.object({
        bookingId: z.string({
            required_error: 'Booking ID is required',
        }),
        endTime: z.string({
            required_error: 'End Time is required',
        }),
    }),
});

export const BookingValidations = {
    bookingSetValidationSchema,
    bookingEndValidationSchema,
};
