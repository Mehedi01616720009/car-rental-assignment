import mongoose from 'mongoose';
import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
    const errorMessages: TErrorMessages = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessages,
    };
};

export default handleCastError;
