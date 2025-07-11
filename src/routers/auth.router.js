import express from "express";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/get-info", authController.getInfo);
authRouter.post("/refresh-token", authController.refreshToken); // làm mới token
authRouter.post("/logout", authController.logout);

export default authRouter;
