import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

// book a car route for only user
router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(BookingValidations.bookingSetValidationSchema),
    BookingController.createBooking,
);

// all bookings get route for only admin
router.get('/', auth(USER_ROLE.admin), BookingController.getAllBookings);

// my bookings get route for only user
router.get(
    '/my-bookings',
    auth(USER_ROLE.user),
    BookingController.getMyBooking,
);

export const BookingRoutes = router;
