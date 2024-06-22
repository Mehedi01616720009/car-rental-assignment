import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const signUpUser = catchAsync(async (req, res) => {
    const result = await UserServices.signUpUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

const signInUser = catchAsync(async (req, res) => {
    const result = await UserServices.signInUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result.user,
        token: result.accessToken,
    });
});

export const UserController = {
    signUpUser,
    signInUser,
};
