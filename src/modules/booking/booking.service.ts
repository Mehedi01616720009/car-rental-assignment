import { JwtPayload } from 'jsonwebtoken';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Car } from '../car/car.model';
import { bookingSearchableFields } from './booking.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const createBookingIntoDB = async (
    userData: JwtPayload,
    payload: Partial<IBooking>,
) => {
    const user = await User.findById(userData.userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User invalid');
    }

    payload.user = user._id;
    const createdData = await Booking.create(payload);
    const result = await Booking.findById(createdData._id)
        .populate('user')
        .populate('car');

    // update car availability
    await Car.findByIdAndUpdate(payload.car, {
        status: 'unavailable',
    });

    return result;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
    if (query?.carId) {
        query.car = query?.carId;
        delete query.carId;
    }

    const fetch = new QueryBuilder(
        Booking.find().populate('user').populate('car'),
        query,
    )
        .search(bookingSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await fetch.modelQuery;
    return result;
};

const getMyBookingsFromDB = async (userData: JwtPayload) => {
    const user = await User.findById(userData.userId).select('_id');
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User invalid');
    }
    const result = await Booking.find({ user: user._id })
        .populate('user')
        .populate('car');
    return result;
};

// const updateCarIntoDB = async (id: string, payload: Partial<ICar>) => {
//     const result = await Car.findByIdAndUpdate(id, payload, {
//         new: true,
//         runValidators: true,
//     });
//     return result;
// };

// const deleteCarFromDB = async (id: string) => {
//     const result = await Car.findByIdAndUpdate(
//         id,
//         { isDeleted: true },
//         { new: true },
//     );
//     return result;
// };

export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingsFromDB,
};
