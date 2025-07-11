import permissionService from "../services/permission.service.js";
import { responseSeccess } from "../common/helpers/response.helper.js";


const permissionController = {
   create: async function (req, res, next) {
      try {
         const result = await permissionService.create(req);
         const response = responseSeccess(result, `Create permission successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findAll: async function (req, res, next) {
      try {
         const result = await permissionService.findAll(req);
         const response = responseSeccess(result, `Get all permissions successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   findOne: async function (req, res, next) {
      try {
         const result = await permissionService.findOne(req);
         const response = responseSeccess(result, `Get permission #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   update: async function (req, res, next) {
      try {
         const result = await permissionService.update(req);
         const response = responseSeccess(result, `Update permission #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },

   remove: async function (req, res, next) {
      try {
         const result = await permissionService.remove(req);
         const response = responseSeccess(result, `Remove permission #${req.params.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   groupByModule: async function (req, res, next) {
      try {
         const result = await permissionService.groupByModule(req);
         const response = responseSeccess(result, `Group by module successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   }
};

export default permissionController;