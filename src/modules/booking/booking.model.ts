import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: [true, 'Role is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
    },
    {
        timestamps: true,
    },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
