import { Types } from 'mongoose';

// booking interface
export interface IBooking {
    date: string;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime: string;
    totalCost: number;
}
