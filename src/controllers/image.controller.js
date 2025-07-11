import { responseSuccess, responseError } from "../common/helpers/response.helper";
import imageService from "../services/image.service";

const imageController = {
  getImages: async (req, res) => {
    try {
      const result = await imageService.getImages(req);
      console.log("getImages API result:", result);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log("getImages API error:", error);
      const resData = responseError(error);
      res.status(resData.statusCode).json(resData);
    }
  },

  getImageById: async (req, res) => {
    try {
      const result = await imageService.getImageById(req);
      console.log("getImageById API result:", result);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log("getImageById API error:", error);
      const resData = responseError(error);
      res.status(resData.statusCode).json(resData);
    }
  },

  getCommentsByImageId: async (req, res) => {
    try {
      const result = await imageService.getCommentsByImageId(req);
      console.log("getCommentsByImageId API result:", result);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log("getCommentsByImageId API error:", error);
      const resData = responseError(error);
      res.status(resData.statusCode).json(resData);
    }
  },

  checkSavedImage: async (req, res) => {
    try {
      const result = await imageService.checkSavedImage(req);
      console.log("checkSavedImage API result:", result);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log("checkSavedImage API error:", error);
      const resData = responseError(error);
      res.status(resData.statusCode).json(resData);
    }
  },

  postComment: async (req, res) => {
    try {
      const result = await imageService.postComment(req);
      console.log("postComment API result:", result);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log("postComment API error:", error);
      const resData = responseError(error);
      res.status(resData.statusCode).json(resData);
    }
  },

  deleteImage: async (req, res) => {
    try {
      const result = await imageService.deleteImage(req);
      console.log("deleteImage API result:", result);
      const resData = responseSuccess(result);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      console.log("deleteImage API error:", error);
      const resData = responseError(error);
      res.status(resData.statusCode).json(resData);
    }
  },
};

export default imageController;
