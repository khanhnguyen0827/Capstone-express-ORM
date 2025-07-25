import express from "express";
import { handleError } from "./src/common/helpers/handle-err.helper";
import rootRouter from "./src/routers/root.router";
import logApi from "./src/common/morgan/init.morgan";
import cors from "cors";
import { createServer } from "http";
var app = express();

// middleware
app.use(express.json());
app.use(logApi);
app.use(
   cors({
      origin: ["https://google.com", "http://localhost:3000"],
   })
);
app.use(express.static("."));

// gắn rootRouter vào app
// app: http://localhost:3069
app.use(rootRouter);
// Middleware gom lỗi và chỉ nên có 1 trong nguyên cả ứng dụng
// Nên để cuối cùng
app.use(handleError);

const httpServer = createServer(app);

// Removed socket initialization
// initSocket(httpServer);

httpServer.listen(3069, () => {
   console.log(`Server running on port http://localhost:3069`);
});

/**
 * QUAN TRỌNG
 * express version thấp hơn 5 thì sẽ cần bọc try/catch để xử lý lỗi
 * express version từ 5 trở lên thì không cần nữa
 */

/**
 * express: lõi để xây dựng BE -> API
 * nodemon: reload lại server khi có code thay
 * mysql2: để tương tác với DB bằng CÂU LỆNH SQL
 * sequelize: ORM giúp tương tác với DB bằng function
 * sequelize-auto: giúp kéo table vào trong code và tự tạo ra model (DATABASE FIRST),
 * extensionless: giúp import file mà không cần phải thêm đuôi js
 * morgan: giúp show log ra terminal khi có 1 api gọi tới
 * chalk: tô màu cho terminal đẹp đẹp
 * dotenv: để đọc biến trong file .env
 * prisma: ORM tương tác DB
 *    - npx prisma db pull
 *    - npx prisma generate
 * cors: mở bảo vệ CORS
 * bcrypt: mã hoá password
 * jsonwebtoken: tạo token / thay thế việc xác minh bằng email / password
 * nodemailer: gửi email
 * jest: giúp viết unit test
 * swagger-ui-express: tích hợp swagger
 * multer: giúp upload file
 * cloudinary: upload hình ảnh lên đám mây
 * socket.io: realtime hỗ trợ chức năng chat
 */
