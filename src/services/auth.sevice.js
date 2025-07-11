import prisma from "../common/prisma/init.prisma";
import { BadrequestException } from "../common/helpers/exception.helper";
import bcrypt from "bcrypt";
import tokenService from "./token.Service";
import { OAuth2Client } from "google-auth-library";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from "../common/constant/app.constant";
import jwt from "jsonwebtoken"; // Import JWT for decoding tokens
import  sendmail  from "../common/nodemailer/init.nodemailer.js";
// import { statusCodes } from "../common/helpers/status-code.helper";  

const authService = {
    // Logic for user login
    // For example, check credentials and set isAuthenticated to true
   
  register: async (req) => {

    const { fullName, password, email } = req.body;

    //Tìm kiếm người dùng theo email có trong cơ sở dữ liệu
    const userexist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    }) 
    // Kiểm tra xem người dùng đã tồn tại hay chưa
    // Nếu người dùng đã tồn tại, trả về thông báo lỗi  
    if (userexist) {
      throw new BadrequestException(`Email đã được đăng ký`);
      // Nếu người dùng đã tồn tại, ném ra lỗi BadrequestException
      // Nếu người dùng đã tồn tại, trả về thông báo lỗi
}

//mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
//dúng bcrypt để mã hóa mật khẩu
    // const hashedPassword = await bcrypt.hash(password, 10);
   const hashedPassword = bcrypt.hashSync(password, 10);

    // Tạo người dùng trong cơ sở dữ liệu
    const usernew = await prisma.users.create({
      data: {
        fullName: fullName,
        password: hashedPassword,
        email: email,
      },
    });

    console.log(usernew);

    //usernew.password = undefined; // Ẩn mật khẩu trong kết quả trả về
    delete usernew.password; // Xóa mật khẩu khỏi đối tượng người dùng
   
    return usernew;
  } ,
   login: async (req) => {
    const { email, password } = req.body;
    // Tìm kiếm người dùng theo email
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!user) {
      throw new BadrequestException(`Email không tồn tại`);
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong cơ sở dữ liệu
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      throw new BadrequestException(`Mật khẩu không đúng`);
    }
    // Nếu đăng nhập thành công, trả về thông tin người dùng
    // Xóa mật khẩu khỏi đối tượng người dùng để không trả về mật khẩu
    delete user.password; // Xóa mật khẩu khỏi đối tượng người dùng
    // Trả về thông tin người dùng đã đăng nhập

    // token của người dùng  có thể được tạo ra ở đây nếu cần acss token || refresh token
    const tokens = tokenService.createTokens(user.id);
    //
    sendmail("khanhnguyen0827@gmail.com");

    return tokens;    
  },

  getInfo: async (req) => {
    // Lấy thông tin người dùng từ request  
    const user = req.user; // Người dùng đã được xác thực trong middleware
    if (!user) {
      throw new BadrequestException("Người dùng không tồn tại");
    }
    // Xóa mật khẩu khỏi đối tượng người dùng để không trả về mật khẩu
    delete user.password; // Xóa mật khẩu khỏi đối tượng người dùng
    // Trả về thông tin người dùng
    return user; // Trả về thông tin người dùng
  },

  googleLogin: async (req) => {
    // Xử lý đăng nhập bằng Google
    // Trong trường hợp này, bạn có thể sử dụng thông tin từ Google để đăng nhập hoặc đăng ký người dùng    
    const { code } = req.body;

    
    const oAuth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      'postmessage' 
    );
    // 'postmessage' là redirect URI, bạn có thể thay đổi tùy theo cấu hình của bạn
    
    // keys là thông tin cấu hình OAuth2 từ Google
    // keys có thể được lấy từ file JSON của Google OAuth2
    // Lấy token từ Google

    //nếu qua dòng code nay thì google se dùng code de lay token
    const  { tokens: tokensGoogle }  = await oAuth2Client.getToken(code);// Lấy token từ Google

    const decodedToken = jwt.decode(tokensGoogle.id_token);
//console.log("code", { code,id_token: tokensGoogle.id_token, decodedToken });


    const { email, email_verified, name,picture } = decodedToken;
    // Lấy thông tin người dùng từ Google
    if (!email_verified) throw new BadrequestException("Email không được xác thực");

    // Tìm kiếm người dùng theo email
    let userExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // Tạo người dùng trong cơ sở dữ liệu
    if (!userExist) {
      
      userExist = await prisma.users.create({
        data: {
          fullName: name,
          email: email,
          avatar: picture,
        },
      })
    };

      const tokens = tokenService.createTokens(userExist.id);


      return tokens;
    
    // Tìm kiếm người dùng theo email
    
    //oAuth2Client.setCredentials(tokens);
    // Lấy thông tin người dùng từ Google
  
    // Tìm kiếm người dùng theo email
    
  },  

  refreshToken: async (req) => {
  const { accessToken ,refreshToken } = req.body;
  // Kiểm tra xem refreshToken có hợp lệ hay không
  const decodedRefreshToken = tokenService.verifyRefreshToken(refreshToken);
  // Nếu refreshToken hợp lệ, tạo mới accessToken
   const decodedAccessToken = tokenService.verifyAccessToken(accessToken, true);
  // Nếu accessToken hợp lệ, tạo mới accessToken

  // Kiểm tra xem userID trong accessToken và refreshToken có khớp nhau không
    if(decodedAccessToken.userID !== decodedRefreshToken.userID) {
      throw new BadrequestException("Refresh token không hợp lệ");
    } 

  // Tạo mới accessToken
  const newToken = tokenService.createTokens(decodedAccessToken.userID);
  // Trả về accessToken mới
    return newToken;
  // Xử lý làm mới token
  },

  logout: async (req) => {

    // Xử lý đăng xuất người dùng

    // Trong trường hợp này, không có logic cụ thể cho đăng xuất
    // Bạn có thể xóa token hoặc thực hiện các hành động khác nếu cần

    return { message: "Đăng xuất thành công" };
  },


}
  export default authService