import { responseSeccess } from "../common/helpers/response.helper.js";
import roleService from "../services/role.service.js";

export const roleController = {
   create: async function (req, res, next) {
      const result = await roleService.create(req);
      const response = responseSeccess(result, `Create role successfully`);
      res.status(response.statusCode).json(response);
   },

   findAll: async function (req, res, next) {
      const result = await roleService.findAll(req);
      const response = responseSeccess(result, `Get all roles successfully`);
      res.status(response.statusCode).json(response);
   },

   findOne: async function (req, res, next) {
      const result = await roleService.findOne(req);
   
      const response = responseSeccess(result, `Get role #${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   update: async function (req, res, next) {
      const result = await roleService.update(req);
      const response = responseSeccess(result, `Update role#${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },

   remove: async function (req, res, next) {
      const result = await roleService.remove(req);
      const response = responseSeccess(result, `Remove role#${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },
   togglePermission: async function (req, res, next) {
      const result = await roleService.togglePermission(req);
      const response = responseSeccess(result, `Toggle permission#${req.params.id} successfully`);
      res.status(response.statusCode).json(response);
   },
};

export default roleController;