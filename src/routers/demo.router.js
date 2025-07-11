import express from 'express';

import demoController from '../controllers/demo.controller.js';
import e from 'express';

const DemoRouter = express.Router();


DemoRouter.get('/', demoController.hello);
DemoRouter.get('/query', demoController.query);
DemoRouter.get('/params/:id', demoController.params);
DemoRouter.get('/headers', demoController.headers);
DemoRouter.post('/body', demoController.body);

DemoRouter.get('/mysql2', demoController.mysql2);


//middleware

DemoRouter.get('/sequelize',
    (req, res, next)=>{
        const middleware1 = {
            name: 'Middleware 1',
            description: 'This is the first middleware',
            version: '1.0.0'    
        };
        req.middleware1 = middleware1;
        console.log(`Middleware 1`);next()},
    (req, res, next)=>{
        
        console.log(req.middleware1); 
        next();}, 
    
    demoController.sequelize);


export default DemoRouter;


