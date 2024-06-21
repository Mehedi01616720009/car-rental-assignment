import { TErrorResponse, TErrorMessages } from '../interface/error';

const handleDuplicateError = (err: any): TErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const errorMessages: TErrorMessages = [
        {
            path: '',
            message: `${extractMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessages,
    };
};

export default handleDuplicateError;
