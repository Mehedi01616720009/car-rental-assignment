import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

// signup route
router.post(
    '/signup',
    validateRequest(UserValidations.userSignUpValidationSchema),
    UserController.signUpUser,
);

// signin route
router.post(
    '/signin',
    validateRequest(UserValidations.userSignInValidationSchema),
    UserController.signInUser,
);

export const UserRoutes = router;
