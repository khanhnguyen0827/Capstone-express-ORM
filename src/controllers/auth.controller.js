import { responseSuccess, responseError } from "../common/helpers/response.helper";
import authService from "../services/auth.service";

const authController = {
   register: async (req, res) => {
      try {
         const result = await authService.register(req);
         const resData = responseSuccess(result);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },
   login: async (req, res) => {
      try {
         const result = await authService.login(req);
         const resData = responseSuccess(result);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },
};

export default authController;
