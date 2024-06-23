import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.createBookingIntoDB(req.user, {
        car: req.body.carId,
        date: req.body.date,
        startTime: req.body.startTime,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Car booked successfully',
        data: result,
    });
});

const getAllBookings = catchAsync(async (req, res) => {
    const { carId, date } = req.query;
    const query = { car: carId, date };
    const result = await BookingServices.getAllBookingsFromDB(
        query as {
            car: string | undefined;
            date: string | undefined;
        },
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    getAllBookings,
};
