import mongoose, { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

// booking schema
const bookingSchema = new Schema<IBooking>(
    {
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        car: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Car is required'],
            ref: 'Car',
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

// booking model
export const Booking = model<IBooking>('Booking', bookingSchema);
