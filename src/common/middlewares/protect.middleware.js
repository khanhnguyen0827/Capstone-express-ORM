import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
// import tokenService from "../../services/token.service.js"; // TODO: Create this file
import prisma from "../prisma/init.prisma.js";

const protect = async (req, res, next) => {
   req.isProtect = true;

   const authHeader = req.headers?.authorization || "";
   const [type, token] = authHeader.split(" ");
   if (!token) {
      throw new UnauthorizedException("Không có token");
   }
   if (type !== `Bearer`) {
      throw new UnauthorizedException("Kiểu token không hợp lệ");
   }

   // TODO: Implement token verification when tokenService is available
   // For now, just pass through without authentication
   console.log({ token });
   
   // Temporary: Skip token verification
   // const decode = tokenService.verifyAccessToken(token);
   // const user = await prisma.users.findUnique({
   //    where: {
   //       user_id: decode.userId,
   //    }
   // });
   
   // req.user = user;
   req.user = { id: 1, email: "test@example.com" }; // Temporary mock user

   console.log({
      token,
      type,
      message: "Token verification temporarily disabled"
   });

   next();
};

export default protect;
