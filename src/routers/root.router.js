import express from "express";
import authRouter from "./auth.router";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../common/swagger/init.swagger";
import userRouter from "./user.router";
import imageRouter from "./image.router";



const rootRouter = express.Router();

rootRouter.use("/api-docs", swaggerUi.serve);
rootRouter.get(
   "/api-docs",
   swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
         persistAuthorization: true,
      },
   })
);

// app: http://localhost:3069
// demoRouter: /demo
// demoRouter = app + demoRouter: http://localhost:3069/demo


rootRouter.use("/auth", authRouter);

rootRouter.use("/user", userRouter);

rootRouter.use("/images", imageRouter);

export default rootRouter;
