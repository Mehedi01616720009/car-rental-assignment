import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
    name: string;
    email: string;
    role: 'admin' | 'user';
    password: string;
    phone: string;
    address: string;
}

export interface ILoggedUser extends IUser {
    _id: string;
}

export interface IUserModel extends Model<IUser> {
    isUserExistById(id: string): Promise<ILoggedUser | null>;
    isUserExistByEmail(email: string): Promise<ILoggedUser | null>;
    isPasswordMatched(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
