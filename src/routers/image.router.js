import express from "express";
import imageController from "../controllers/image.controller";
import protectMiddleware from "../common/middlewares/protect.middleware";

const imageRouter = express.Router();

imageRouter.get("/", imageController.getImages);
imageRouter.get("/:id", imageController.getImageById);
imageRouter.get("/:id/comments", imageController.getCommentsByImageId);
imageRouter.get("/:id/saved", protectMiddleware, imageController.checkSavedImage);
imageRouter.post("/:id/comments", protectMiddleware, imageController.postComment);
imageRouter.delete("/:id", protectMiddleware, imageController.deleteImage);

export default imageRouter;
