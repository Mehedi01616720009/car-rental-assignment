import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router.post(
    '/signup',
    validateRequest(UserValidations.userSignUpValidationSchema),
    UserController.signUpUser,
);

router.post(
    '/signin',
    validateRequest(UserValidations.userSignInValidationSchema),
    UserController.signInUser,
);

export const UserRoutes = router;
