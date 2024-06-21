import express from 'express';
import { CarController } from './car.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CarValidations } from './car.validation';

const router = express.Router();

// car create route
router.post(
    '/',
    validateRequest(CarValidations.createCarValidationSchema),
    CarController.createCar,
);

// all car get route
router.get('/', CarController.getAllCar);

// single car create route
router.get('/:id', CarController.getSingleCar);

// car update route
router.patch(
    '/:id',
    validateRequest(CarValidations.updateCarValidationSchema),
    CarController.updateCar,
);

// single car soft delete route
router.delete('/:id', CarController.deleteCar);

export const CarRoutes = router;
