import express from "express";
// Import express for creating the server and handling requests

import rootRouter from "./src/routers/root.router.js";
import { handleErr } from "./src/common/helpers/handle-err.helper";
import { PORT } from "./src/common/constant/app.constant.js";
// Import Sequelize for ORM support
const app = express();
app.use(express.json());//Chuyển dạng json sang đối tượng js trên req.body
app.use("/",rootRouter);// Khoi tao router

// Middleware bắt lỗi
app.use(handleErr)
// Tạo server 
// Sử dụng app.listen() để tạo server và lắng nghe các yêu cầu từ clien
app.listen(PORT, () => {
    console.log("Server is running on port "+PORT   );
});
