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

export const BookingController = {
    createBooking,
};
