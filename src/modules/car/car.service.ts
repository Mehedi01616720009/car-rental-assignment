import mongoose from 'mongoose';
import { Booking } from '../booking/booking.model';
import { ICar } from './car.interface';
import { Car } from './car.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// create a car
const createCarIntoDB = async (payload: ICar) => {
    const result = await Car.create(payload);
    return result;
};

// get all cars
const getAllCarFromDB = async () => {
    const result = await Car.find();
    return result;
};

// get a car
const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result;
};

// update a car
const updateCarIntoDB = async (id: string, payload: Partial<ICar>) => {
    const result = await Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

// soft delete a car
const deleteCarFromDB = async (id: string) => {
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

// return car from user
const returnCarFromUserIntoDB = async (payload: {
    bookingId: string;
    endTime: string;
}) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const updateEndTime = await Booking.findByIdAndUpdate(
            payload.bookingId,
            { endTime: payload.endTime },
            { new: true, session },
        );

        if (!updateEndTime) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update end time',
            );
        }

        const startTime = updateEndTime?.startTime.split(':')[0];
        const endTime = updateEndTime?.endTime.split(':')[0];

        const hourDifference = Number(endTime) - Number(startTime);

        // update car availability
        const car = await Car.findByIdAndUpdate(
            updateEndTime?.car?._id,
            {
                status: 'available',
            },
            { new: true, session },
        );

        const pricePerHour = car?.pricePerHour;
        const totalCost = Number(pricePerHour) * hourDifference;

        const result = await Booking.findByIdAndUpdate(
            payload.bookingId,
            { totalCost },
            { new: true, session },
        )
            .populate('user')
            .populate('car');

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
    }
};

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB,
    returnCarFromUserIntoDB,
};
