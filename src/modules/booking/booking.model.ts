import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
    {
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        user: {
            type: Schema.Types.ObjectId,
        },
        car: {
            type: Schema.Types.ObjectId,
            required: [true, 'Car is required'],
        },
        startTime: {
            type: String,
            required: [true, 'Start Time is required'],
        },
        endTime: {
            type: String,
            default: null,
        },
        totalCost: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
