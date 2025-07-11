

import express from "express";
import authController from "../controllers/auth.controller";
import process  from "../common/middlewares/protect.middleware";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", process,authController.getInfo);
authRouter.post("/google-login",authController.googleLogin);
authRouter.post("/refresh-token", authController.refreshToken);//lam moi token
authRouter.post("/logout", authController.logout);  

export default authRouter;
