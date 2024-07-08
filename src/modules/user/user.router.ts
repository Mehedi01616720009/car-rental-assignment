import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

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

// get me route
router.get(
    '/me',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
    UserController.getMe,
);

// get new access token by refresh token route
router.get(
    '/access-token',
    validateRequest(UserValidations.refreshTokenValidationSchema),
    UserController.getNewAccessToken,
);

export const UserRoutes = router;
