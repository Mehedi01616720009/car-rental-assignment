import { Booking } from '../booking/booking.model';
import { ICar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: ICar) => {
    const result = await Car.create(payload);
    return result;
};

const getAllCarFromDB = async () => {
    const result = await Car.find();
    return result;
};

const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<ICar>) => {
    const result = await Car.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteCarFromDB = async (id: string) => {
    const result = await Car.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

const returnCarFromUserIntoDB = async (payload: {
    bookingId: string;
    endTime: string;
}) => {
    const fetchBooking = await Booking.findByIdAndUpdate(
        payload.bookingId,
        { endTime: payload.endTime },
        { new: true },
    );

    const startTime = fetchBooking?.startTime.split(':')[0];
    const endTime = fetchBooking?.endTime.split(':')[0];

    const hourDifference = Number(endTime) - Number(startTime);

    // update car availability
    const car = await Car.findByIdAndUpdate(
        fetchBooking?.car?._id,
        {
            status: 'available',
        },
        { new: true },
    );

    const pricePerHour = car?.pricePerHour;
    const totalCost = Number(pricePerHour) * hourDifference;

    const result = await Booking.findByIdAndUpdate(
        payload.bookingId,
        { totalCost },
        { new: true },
    )
        .populate('user')
        .populate('car');

    return result;
};

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarFromDB,
    returnCarFromUserIntoDB,
};
