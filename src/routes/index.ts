import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { CarRoutes } from '../modules/car/car.router';
import { BookingRoutes } from '../modules/booking/booking.router';

// route initialization
const router = Router();

// routes data
const routes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/cars',
        route: CarRoutes,
    },
    {
        path: '/bookings',
        route: BookingRoutes,
    },
];

// routes execution
routes.forEach(route => router.use(route.path, route.route));

export default router;
