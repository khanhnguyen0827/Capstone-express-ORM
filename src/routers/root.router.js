import express from 'express';

import DemoRouter from './demo.router.js';
import authRouter from './auth.router.js';
import imageRouter from './image.router.js';

const rootRouter = express.Router();

rootRouter.use('/demo', DemoRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/images', imageRouter);

export default rootRouter;
