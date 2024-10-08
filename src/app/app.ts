import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from '../middlewares/globalErrorHandler';
import notFound from '../middlewares/notFound';
import router from '../routes';
import cookieParser from 'cookie-parser';
import config from '../config';

// initialize express application
const app: Application = express();

// cross origin resources
app.use(cors({ origin: config.frontendBaseUrl, credentials: true }));

// cookie parser
app.use(cookieParser());

// express parser
app.use(express.json());

// initial route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is running successfully',
        data: null,
    });
});

// application routes
app.use('/api', router);

// global error handler
app.use(globalErrorHandler);

// not found api
app.use(notFound);

export default app;
