
import express from "express";
import authController from "../controllers/auth.controller";
import process  from "../common/middlewares/protect.middleware";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API xác thực người dùng
 */

const authRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */
authRouter.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập vào hệ thống
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
authRouter.post("/login", authController.login);

/**
 * @swagger
 * /auth/get-info:
 *   get:
 *     summary: Lấy thông tin người dùng đã xác thực
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 */
authRouter.get("/get-info", process,authController.getInfo);

/**
 * @swagger
 * /auth/google-login:
 *   post:
 *     summary: Đăng nhập bằng Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *             required:
 *               - code
 *     responses:
 *       200:
 *         description: Đăng nhập Google thành công
 */
authRouter.post("/google-login",authController.googleLogin);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Làm mới token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *             required:
 *               - accessToken
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Làm mới token thành công
 */
authRouter.post("/refresh-token", authController.refreshToken);//lam moi token

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 */
authRouter.post("/logout", authController.logout);  

export default authRouter;
