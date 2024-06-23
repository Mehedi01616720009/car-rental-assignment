import { Schema, model } from 'mongoose';
import { ICar, ICarModel } from './car.interface';
import { carStatus } from './car.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const carSchema = new Schema<ICar>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        color: {
            type: String,
            required: [true, 'Color is required'],
        },
        isElectric: {
            type: Boolean,
            required: [true, 'isElectric is required'],
        },
        status: {
            type: String,
            enum: carStatus,
            default: 'available',
        },
        features: {
            type: [String],
            required: [true, 'Features is required'],
        },
        pricePerHour: {
            type: Number,
            required: [true, 'Price per hour is required'],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

carSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isCarExist = await Car.findOne(query);
    if (!isCarExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This id is invalid');
    }

    next();
});

carSchema.statics.isCarAvailable = async function (id: string) {
    return await Car.findOne({
        _id: id,
        status: 'available',
    }).select('status');
};

export const Car = model<ICar, ICarModel>('Car', carSchema);
