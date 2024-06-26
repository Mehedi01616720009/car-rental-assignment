import { Response } from 'express';

interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    token?: string;
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
    const response: { [key: string]: any } = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    };

    if (data?.token) {
        response.token = data?.token;
    }

    res.status(data.statusCode).json(response);
};

export default sendResponse;
