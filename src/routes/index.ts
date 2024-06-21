import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { CarRoutes } from '../modules/car/car.router';

const router = Router();

const routes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/cars',
        route: CarRoutes,
    },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
