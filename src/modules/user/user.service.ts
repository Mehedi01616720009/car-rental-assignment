import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import createToken from '../../utils/createToken';
import verifyToken from '../../utils/verifyToken';

// user signup
const signUpUserIntoDB = async (payload: IUser) => {
    const createdData = await User.create(payload);
    const result = await User.findById(createdData._id);
    return result;
};

// user signin
const signInUserFromDB = async (payload: Partial<IUser>) => {
    const user = await User.isUserExistByEmail(payload.email as string);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'No user exist');
    }

    if (
        !(await User.isPasswordMatched(
            payload.password as string,
            user.password,
        ))
    ) {
        throw new AppError(httpStatus.FORBIDDEN, 'Credentials not matched');
    }

    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.accessSecret as string,
        '15d',
    );

    const refreshToken = createToken(
        jwtPayload,
        config.refreshSecret as string,
        '365d',
    );

    const result = await User.findById(user._id);

    return {
        user: result,
        accessToken,
        refreshToken,
    };
};

// user get me only
const getMeFromDB = async (payload: JwtPayload) => {
    const result = await User.findById(payload.userId);
    return result;
};

// user get new access token by refresh token
const getNewAccessTokenByRefreshToken = async (token: string) => {
    const decoded = verifyToken(token, config.refreshSecret as string);
    const { userId } = decoded;

    const user = await User.isUserExistById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'No user exist');
    }

    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.accessSecret as string,
        '15d',
    );

    return { accessToken };
};

// user get me only
const forgetPasswordLinkGenerate = async (payload: { email: string }) => {
    // check user
    const user = await User.isUserExistByEmail(payload.email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'No user exist');
    }

    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };

    // create access token for reset password
    const accessToken = createToken(
        jwtPayload,
        config.accessSecret as string,
        '10m',
    );

    const resetLink = `${config.frontendBaseUrl}/reset-password?token=${accessToken}`;
    // return result;
};

export const UserServices = {
    signUpUserIntoDB,
    signInUserFromDB,
    getMeFromDB,
    getNewAccessTokenByRefreshToken,
    forgetPasswordLinkGenerate,
};
