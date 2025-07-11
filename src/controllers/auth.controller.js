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
         const { email, password } = req.body;

         // Basic input validation
         if (!email || !password) {
            return res.status(400).json({
               statusCode: 400,
               message: "Email và mật khẩu không được để trống",
               success: false,
               data: null,
            });
         }

         const result = await authService.login(req);
         console.log("Login API result:", result);

         // Log successful login
         console.log(`User logged in: ${email}`);

         // Return tokens and user info
         const resData = responseSuccess({
            user: {
               id: result.user.id,
               email: result.user.email,
               fullName: result.user.fullName,
            },
            tokens: result.tokens,
         });

         res.status(resData.statusCode).json(resData);
      } catch (error) {
         console.log("Login API error:", error);
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },
   getInfo: async (req, res) => {
      try {
         const userId = req.user?.id;
         const user = await authService.getInfo(userId);
         const resData = responseSuccess(user);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },

   refreshToken: async (req, res) => {
      try {
         const { refreshToken } = req.body;
         const tokens = await authService.refreshToken(refreshToken);
         const resData = responseSuccess(tokens);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },

   logout: async (req, res) => {
      try {
         const { refreshToken } = req.body;
         const result = await authService.logout(refreshToken);
         const resData = responseSuccess(result);
         res.status(resData.statusCode).json(resData);
      } catch (error) {
         const resData = responseError(error);
         res.status(resData.statusCode).json(resData);
      }
   },
};

export default authController;
