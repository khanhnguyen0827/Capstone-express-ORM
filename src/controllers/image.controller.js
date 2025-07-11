import imageService from '../services/image.service.js';

const imageController = {
  getAllImages: async (req, res, next) => {
    try {
      const images = await imageService.getAllImages();
      res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  },

  searchImages: async (req, res, next) => {
    try {
      const { name } = req.query;
      const images = await imageService.searchImages(name);
      res.status(200).json(images);
    } catch (error) {
      next(error);
    }
  },

  getImageDetail: async (req, res, next) => {
    try {
      const { image_id } = req.params;
      const imageDetail = await imageService.getImageDetail(image_id);
      res.status(200).json(imageDetail);
    } catch (error) {
      next(error);
    }
  },

  getImageComments: async (req, res, next) => {
    try {
      const { image_id } = req.params;
      const comments = await imageService.getImageComments(image_id);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  },

  checkImageSaved: async (req, res, next) => {
    try {
      const { image_id } = req.params;
      const isSaved = await imageService.checkImageSaved(req.user, image_id);
      res.status(200).json({ isSaved });
    } catch (error) {
      next(error);
    }
  },

  postImageComment: async (req, res, next) => {
    try {
      const { image_id } = req.params;
      const commentData = req.body;
      const newComment = await imageService.postImageComment(req.user, image_id, commentData);
      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  },

  deleteImage: async (req, res, next) => {
    try {
      const { image_id } = req.params;
      await imageService.deleteImage(req.user, image_id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default imageController;
