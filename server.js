import express from "express";
// Import express for creating the server and handling requests

import rootRouter from "./src/routers/root.router.js";
import { handleErr } from "./src/common/helpers/handle-err.helper";
// Import Sequelize for ORM support

import logAPI from "./src/common/morgan/init.morgan.js";

import cors from "cors";







const app = express();

app.use(express.json());//Chuyển dạng json sang đối tượng js trên req.body

app.use(logAPI);//thư viện log api (morgan + chalk)

app.use(cors({ origin: ["http://localhost:3000","http://localhost:3001"] }));
    


app.use("/",rootRouter);// Khoi tao router





// Middleware bắt lỗi
app.use(    handleErr)


// Tạo server 
// Sử dụng app.listen() để tạo server và lắng nghe các yêu cầu từ clien
app.listen(3069, () => {
    console.log("Server is running on port 3069");
});


/**
 * quang trong
 * phiên bản epress 5.0.0 trở lên thì ko cần try/catch để xử lý lỗi
 * phien ban 4.0.0 truoc thi phai try/catch
 * để tránh rới hết sever
 */


/**
 * Các thư viện dùng
 * Epress: Cốt lỗi xây dưng API (Application Programming Interface) trên server với tương tác giữa client và server https://expressjs.com/
 * nodemon: dùng để tạo server cốt lỗi  trên API https://www.npmjs.com/package/nodemon
 * MySQL2: dùng để tương tác với db bằng  câu lệnh SQl trên cơ sở dữ liệu MySQL https://www.npmjs.com/package/mysql2
 * sequelize: Dùng để tương tác với db bằng ORM (object relational mapping) hay hàm function trên cơ sở dữ liệu MySQL https://sequelize.org
 * sequelize-auto: Dùng để tạo mô hình với cơ sở dữ liệu MySQL còn gọi Database First https://github.com/sequelize/sequelize-auto
 * extensionless: giúp import file mà ko cần thêm duôi js
 * morgan giúp show log trên terminal
 * chalk: giúp màu câu lệnh trên terminal
 * dotenv: giúp quản lý biến môi trường trong file .env
 * prisma: Dùng để tương tác với db bằng ORM (object relational mapping) hay hàm function trên cơ sở dữ liệu MySQL https://www.prisma.io/
 *  - B1:    npm i prisma : dung để cài đặt Prisma
 *  - B2:    npx prisma init   : dung để khởi tạo cấu trúc thư mục và file cấu hình của Prisma.
 *  - B3:     + cấu hình file .env với DATABASE_URL="mysql://root:password@localhost:3306/db_name"
 * *          + cấu hình file prisma/schema.prisma với
 * *                    generator client { provider = "prisma-client-js"}// Tạo ra các mô hình dựa trên cơ sở dữ liệu đã đồng bộ hóa
 * *                    datasource db {provider = "mysql"  // Cơ sở dữ liệu cơ bản Hoặc postgresql, sqlite, sqlserver
 * *                                    url      = env("DATABASE_URL")}// Cơ sở dữ liệu cơ bản Hoặc postgresql, sqlite, sqlserver
 *  - B4:    npx prisma db pull :dung để đồng bộ hóa cơ sở dữ liệu với Prisma schema
 *  - B5:    npx prisma generate :dung để tạo ra các mô hình dựa trên cơ sở dữ liệu đã đồng bộ npx hóa
 * 
 * 
 * CORS: dùng để phân quyen tương tác giữa client và server : https://www.npmjs.com/package/cors
 * b1 cài đặt: npm i cors
 * b2 dùng: app.use(cors())
 * 
 * bcrypt : dùng để mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu https://www.npmjs.com/package/bcrypt
 * 
 * JWT: dùng để tạo token trên server với client https://www.npmjs.com/package/jsonwebtoken 
 * thay thế xác minh 
 * b1: npm i jsonwebtoken
 * b2: tạo file .env với JWT_SECRET=abcdefghijklmnopqrstuvwxyz1234567890
 * 
 * google-auth-library: dùng để xác thực người dùng với tài khoản Google https://www.npmjs.com/package/google-auth-library
 * b1: npm i google-auth-library
 * 
 * nodemailer: dùng để tạo mail trên server với client https://www.npmjs.com/package/nodemailer
 * b1 npm i nodemailer
 * 
 * 
 * jest: dùng để test code https://www.npmjs.com/package/jest
 * dùng để viết unit test cho code https://www.npmjs.com/package/jest
 * npm i jest
 * 
 * "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage --watch",
 * 
 * dùng để tạo file test cho code
 * npm i @types/jest

 */

