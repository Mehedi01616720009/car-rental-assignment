import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

// create booking controller
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

// get all bookings controller
const getAllBookings = catchAsync(async (req, res) => {
    const result = await BookingServices.getAllBookingsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});

// get my bookings controller
const getMyBooking = catchAsync(async (req, res) => {
    const result = await BookingServices.getMyBookingsFromDB(req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My Bookings retrieved successfully',
        data: result,
    });
});

export const BookingController = {
    createBooking,
    getAllBookings,
    getMyBooking,
};
