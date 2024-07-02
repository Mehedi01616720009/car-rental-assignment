import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string, secret: string) => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (err: any) {
        return err;
    }
};

export default verifyToken;
