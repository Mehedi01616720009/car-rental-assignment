import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: [true, 'Role is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: 0,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    // check email duplicate
    const isUserExist = await User.findOne({ email: this?.email });
    if (isUserExist) {
        throw new AppError(httpStatus.IM_USED, 'This Email already exist');
    }

    // create hash password
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcryptSaltRounds),
    );

    next();
});

userSchema.statics.isUserExistById = async function (id: string) {
    return await User.findById(id);
};

userSchema.statics.isUserExistByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
    plainPassword: string,
    hashedPassword: string,
) {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<IUser, IUserModel>('User', userSchema);
