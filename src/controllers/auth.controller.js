import { responseSuccess, responseError } from "../common/helpers/response.helper";
import authService from "../services/auth.service";

const authController = {
   register: async (req, res) => {
      try {
         const result = await authService.register(req);
         console.log("Register API result:", result);
         const resData = responseSuccess(result);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         console.log("Register API error:", error);
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },
   login: async (req, res) => {
      try {
         const result = await authService.login(req);
         console.log("Login API result:", result);
         const resData = responseSuccess(result);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         console.log("Login API error:", error);
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },
};

export default authController;
