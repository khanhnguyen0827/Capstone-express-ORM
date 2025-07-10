import express from "express";
import authRouter from "./auth.router.js";

// Uncomment these when the files exist
// import roleRouter from "./role.router.js";
// import userRouter from "./user.router.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../common/swagger/init.swagger.js";

const rootRouter = express.Router();

// Swagger documentation - uncomment when swagger file exists
// rootRouter.use("/api-docs", swaggerUi.serve);
// rootRouter.get(
//    "/api-docs",
//    swaggerUi.setup(swaggerDocument, {
//       swaggerOptions: {
//          persistAuthorization: true,
//       },
//    })
// );

// Routes
rootRouter.use("/auth", authRouter);

// Add other routes when files exist
// rootRouter.use("/user", userRouter);
// rootRouter.use("/role", roleRouter);

export default rootRouter;
