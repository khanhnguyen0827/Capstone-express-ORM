import { BadrequestException, UnauthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import tokenService from "./token.service";
import sendMail from "../common/nodemailer/init.nodemailer";

const authService = {
   register: async (req) => {
      const { email, password, fullName } = req.body;

      // Tìm kiếm email đã tồn tại hay chưa
      const userExist = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });

      if (userExist) {
         throw new BadrequestException("Tài khoản đã tồn tại vui lòng đăng nhập");
      }

      // Mã hoá password (băm | hashing)
      const passwordHash = bcrypt.hashSync(password, 10);

      const userNew = await prisma.users.create({
         data: {
            email: email,
            password: passwordHash,
            fullName: fullName,
         },
      });

      // Gửi mail chào mừng (nếu cần)
      sendMail(email);

      return userNew;
   },
   login: async (req) => {
      const { email, password } = req.body;

      const userExist = await prisma.users.findUnique({
         where: {
            email: email,
         },
      });

      if (!userExist) {
         throw new BadrequestException("Người dùng chưa tồn tại xin vui lòng đăng ký");
      }

      const isPassword = bcrypt.compareSync(password, userExist.password);
      if (!isPassword) {
         throw new BadrequestException("Mật khẩu không chính xác");
      }

      // token: access-token | refresh-token
      const tokens = tokenService.createTokens(userExist.id);

      // Return user info with tokens
      return {
         user: {
            id: userExist.id,
            email: userExist.email,
            fullName: userExist.fullName,
         },
         tokens: tokens,
      };
   },
   getInfo: async (userId) => {
      if (!userId) {
         throw new BadrequestException("Không có userId");
      }
      const user = await prisma.users.findUnique({
         where: { id: userId },
         select: {
            id: true,
            email: true,
            fullName: true,
         },
      });
      if (!user) {
         throw new BadrequestException("Người dùng không tồn tại");
      }
      return user;
   },

   refreshToken: async (refreshToken) => {
      if (!refreshToken) {
         throw new BadrequestException("Không có refresh token");
      }
      try {
         const decoded = tokenService.verifyRefreshToken(refreshToken);
         const userId = decoded.userId;
         // Tạo token mới
         const tokens = tokenService.createTokens(userId);
         return tokens;
      } catch (error) {
         throw new UnauthorizedException("Refresh token không hợp lệ hoặc đã hết hạn");
      }
   },

   logout: async (refreshToken) => {
      // Nếu lưu refresh token trong DB hoặc cache, xóa token ở đây
      // Hiện tại giả sử không lưu, chỉ trả về thành công
      return { message: "Đăng xuất thành công" };
   },
};

export default authService;
