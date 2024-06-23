import jwt from 'jsonwebtoken';
import { IUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';

const signUpUserIntoDB = async (payload: IUser) => {
    const createdData = await User.create(payload);
    const result = await User.findById(createdData._id);
    return result;
};

const signInUserIntoDB = async (payload: Partial<IUser>) => {
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

    const accessToken = jwt.sign(jwtPayload, config.accessSecret as string, {
        expiresIn: '10d',
    });

    const result = await User.findById(user._id);

    return {
        user: result,
        accessToken,
    };
};

export const UserServices = {
    signUpUserIntoDB,
    signInUserIntoDB,
};
