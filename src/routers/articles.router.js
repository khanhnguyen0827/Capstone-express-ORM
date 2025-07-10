import express from 'express';

import articlesController from '../controllers/articles.controller.js';
import protect from '../common/middlewares/protect.middleware.js';
import checkPermission from '../common/middlewares/check-permission.middleware.js';




const articlesRoter = express.Router();

articlesRoter.get('/', protect, checkPermission ,articlesController.getAllArticles);


export default articlesRoter;