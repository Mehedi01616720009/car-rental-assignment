import express from 'express';
import { CarController } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// car create route
router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.createCarValidationSchema),
    CarController.createCar,
);

// all car get route
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), CarController.getAllCar);

// single car create route
router.get(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.user),
    CarController.getSingleCar,
);

// car update route
router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(CarValidations.updateCarValidationSchema),
    CarController.updateCar,
);

// single car soft delete route
router.delete('/:id', auth(USER_ROLE.admin), CarController.deleteCar);

export const CarRoutes = router;
