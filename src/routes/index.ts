import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.router';

const router = Router();

const routes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
];

routes.forEach(route => router.use(route.path, route.route));

export default router;
