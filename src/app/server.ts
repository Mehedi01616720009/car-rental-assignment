import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from '../config';

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.databaseUrl as string);

        server = app.listen(config.port, () => {
            console.log({ message: `Server is listening on ${config.port}` });
        });
    } catch (err: any) {
        console.log({
            success: false,
            message: 'Internal server error',
            errorMessages: {
                path: '/',
                message: err?.message,
            },
            stack: err,
        });
    }
}

main();
