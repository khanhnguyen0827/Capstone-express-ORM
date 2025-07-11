import express from 'express';
import imageController from '../controllers/image.controller.js';

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API quản lý hình ảnh
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Lấy danh sách tất cả các hình ảnh
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: Danh sách hình ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
const imageRouter = express.Router();

// API Trang chủ
imageRouter.get('/', imageController.getAllImages);

/**
 * @swagger
 * /images/search:
 *   get:
 *     summary: Tìm kiếm danh sách hình ảnh dựa trên tên hình ảnh
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Tên hình ảnh cần tìm kiếm
 *     responses:
 *       200:
 *         description: Danh sách hình ảnh tìm được
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
imageRouter.get('/search', imageController.searchImages);

/**
 * @swagger
 * /images/{image_id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một hình ảnh cụ thể
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Thông tin chi tiết hình ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
imageRouter.get('/:image_id', imageController.getImageDetail);

/**
 * @swagger
 * /images/{image_id}/comments:
 *   get:
 *     summary: Lấy danh sách bình luận của một hình ảnh cụ thể
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
imageRouter.get('/:image_id/comments', imageController.getImageComments);

/**
 * @swagger
 * /images/{image_id}/is-saved:
 *   get:
 *     summary: Kiểm tra xem hình ảnh đã được người dùng lưu chưa
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hình ảnh
 *     responses:
 *       200:
 *         description: Trạng thái lưu hình ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSaved:
 *                   type: boolean
 */
imageRouter.get('/:image_id/is-saved', imageController.checkImageSaved);

/**
 * @swagger
 * /images/{image_id}/comments:
 *   post:
 *     summary: Đăng một bình luận mới cho hình ảnh
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hình ảnh
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nội dung bình luận
 *     responses:
 *       201:
 *         description: Bình luận được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
imageRouter.post('/:image_id/comments', imageController.postImageComment);

/**
 * @swagger
 * /images/{image_id}:
 *   delete:
 *     summary: Xóa một hình ảnh
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: image_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của hình ảnh
 *     responses:
 *       204:
 *         description: Xóa thành công
 */
imageRouter.delete('/:image_id', imageController.deleteImage);

export default imageRouter;
