import express from 'express';

import DemoRouter from './demo.router.js';
import acticlesRouter from './articles.router.js';
import authRouter from './auth.router.js';
import roleRouter from './role.router.js';
import permissionRouter from './permission.router.js';
const rootRouter = express.Router();

rootRouter.use('/demo', DemoRouter);
rootRouter.use('/article', acticlesRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/role', roleRouter);
rootRouter.use('/permission', permissionRouter);


export default rootRouter;