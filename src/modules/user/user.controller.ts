import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import config from '../../config';

// user signup controller
const signUpUser = catchAsync(async (req, res) => {
    const result = await UserServices.signUpUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

// user signin controller
const signInUser = catchAsync(async (req, res) => {
    const result = await UserServices.signInUserFromDB(req.body);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.nodeEnv === 'production',
        httpOnly: true,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result.user,
        token: result.accessToken,
    });
});

// user get me only controller
const getMe = catchAsync(async (req, res) => {
    const result = await UserServices.getMeFromDB(req.user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved in successfully',
        data: result,
    });
});

// user get new access token controller
const getNewAccessToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result =
        await UserServices.getNewAccessTokenByRefreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token generated successfully',
        data: result,
    });
});

// forget password controller
const forgetPassword = catchAsync(async (req, res) => {
    const result = await UserServices.forgetPasswordLinkGenerate(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link generated successfully',
        data: result,
    });
});

export const UserController = {
    signUpUser,
    signInUser,
    getMe,
    getNewAccessToken,
    forgetPassword,
};
