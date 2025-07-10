

import { UnauthorizedException } from "../helpers/exception.helper";
import tokenService from "../../services/token.Service.js";
import prisma from "../prisma/init.prisma.js";
/**
 * Middleware to protect routes by checking for a valid JWT token in the request header.
 * If the token is missing or invalid, it throws an UnauthorizedException.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
 const protect = async  (req, res, next)=> {
    // Middleware để bảo vệ các route bằng cách kiểm tra token JWT hợp lệ trong request header
    // Nếu token bị thiếu hoặc không hợp lệ, ném ra UnauthorizedException
req.ischeckprotect = true; // Đặt một thuộc tính để xác định rằng middleware đã được thực thi

    //kiêm tra token trong request header
    const authHeader = req.headers?.authorization || "";
    const [type, token] = authHeader.split(" ");
    //Bearer+ ' ' + token
    //kiêm tra token trong request header
    if (!token) {
        throw new UnauthorizedException("Vui long dang nhap");
    }
    //kiểm tra token trong request header
    if (type !== "Bearer") {
        throw new UnauthorizedException("Token khong hop le");
    }

    //kiem tra token có hợp le hay khong
    const decode = tokenService.verifyAccessToken(token);

    const user = await prisma.users.findUnique({
        where: {
            id: decode.userID
        }
    })


    req.user = user; //gán user vào request để sử dụng trong các middleware hoặc route handler sau này
    if (!user) {
        throw new UnauthorizedException("User not found");
    }



    console.log({
        type,
        token,
        decode
    });

    //bearer+ ' ' + token
    //key + token
    next();
}

export default protect;