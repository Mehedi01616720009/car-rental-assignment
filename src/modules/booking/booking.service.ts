import { JwtPayload } from 'jsonwebtoken';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
    return result;
};

// const getAllCarFromDB = async () => {
//     const result = await Car.find();
//     return result;
// };

// const getSingleCarFromDB = async (id: string) => {
//     const result = await Car.findById(id);
//     return result;
// };

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
};
