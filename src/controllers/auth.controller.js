import authService from "../services/auth.sevice.js";
import { responseSeccess } from "../common/helpers/response.helper.js";


const authController = {

     register: async (req, res) => {
        const resutl = await authService.register(req);
       const resData = responseSeccess(resutl, "Register successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    },
    login: async (req, res) => {
        const resutl = await authService.login(req);
        const resData = responseSeccess(resutl, "Login successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    },

    getInfo: async (req, res) => {
        // Lấy thông tin người dùng từ token đã được xác thực
         // req.user được gán trong middleware bảo vệ (protect)
        // Thông tin người dùng đã được xác thực sẽ có trong req.user
        // Nếu không có thông tin người dùng, trả về lỗi BadrequestException
        const resutl = await authService.getInfo(req);
        const resData = responseSeccess(resutl, "Get info successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    },

    googleLogin: async (req, res) => {
        const resutl = await authService.googleLogin(req);
        const resData = responseSeccess(resutl, "Google login successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    },

    refreshToken: async (req, res) => {
        const resutl = await authService.refreshToken(req);
        const resData = responseSeccess(resutl, "Refresh token successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    },

    logout: async (req, res) => {
        const resutl = await authService.logout(req);
        const resData = responseSeccess(resutl, "Logout successful", 200, "Success");
        res.status(resData.statusCode).json(resData);
    }
};

export default authController;
