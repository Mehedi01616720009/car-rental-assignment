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
router.get('/');

export const BookingRoutes = router;
