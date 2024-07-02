import jwt from 'jsonwebtoken';

const createToken = (
    payload: {
        userId: string;
        role: string;
    },
    secret: string,
    expiresIn: string,
) => {
    try {
        return jwt.sign(payload, secret, { expiresIn });
    } catch (err: any) {
        return err;
    }
};

export default createToken;
