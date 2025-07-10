import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN} from "../common/constant/app.constant.js";

const tokenService = {
    createTokens: (userID) => {
        const accessToken = jwt.sign({userID: userID}, ACCESS_TOKEN_SECRET,{expiresIn: ACCESS_TOKEN_EXPIRES_IN});
        const refreshToken = jwt.sign({userID: userID}, REFRESH_TOKEN_SECRET ,{expiresIn: REFRESH_TOKEN_EXPIRES_IN}); 
        //tao token
        //payload : nguoi dung
        //secretOrPrivateKey: ma hoa
        //expiresIn: thoi gian het han
        console.log(accessToken);
        console.log(refreshToken);

        

        

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    },

    verifyAccessToken: (token, ignoreExpiration = false) => {
       return jwt.verify(token, ACCESS_TOKEN_SECRET, {ignoreExpiration: ignoreExpiration});//giai ma
        //tự throw lỗi
        //jwt.decode(accessToken);//giai ma
        
    },
    verifyRefreshToken: (token) => {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);//giai ma
        //tự throw lỗi
        //jwt.decode(refreshToken);//giai ma
    }


};




export default tokenService;
// const tokenService = {