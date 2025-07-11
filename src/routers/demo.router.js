import express from 'express';
const DemoRouter = express.Router();

DemoRouter.get('/', (req, res) => {
  res.send('Demo route is working');
});

export default DemoRouter;
