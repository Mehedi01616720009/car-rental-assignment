import mongoose from 'mongoose';
import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleValidationError = (
    err: mongoose.Error.ValidationError,
): TErrorResponse => {
    const errorMessages: TErrorMessages = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessages,
    };
};

export default handleValidationError;
