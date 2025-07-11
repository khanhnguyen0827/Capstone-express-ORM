

import 'dotenv/config'
import e from 'express';

export const URL_DATABASE = process.env.DATABASE_URL ;
export const PORT = process.env.PORT || 3000;


export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;


export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  USER_REGISTERED_SUCCESS: "Đăng ký người dùng thành công.",
  USER_LOGGED_IN_SUCCESS: "Đăng nhập thành công.",
  USER_NOT_FOUND: "Người dùng không tồn tại.",
  INVALID_CREDENTIALS: "Tên đăng nhập hoặc mật khẩu không đúng.",
  USERNAME_EXISTS: "Tên đăng nhập đã tồn tại.",
  EMAIL_EXISTS: "Email đã tồn tại.",
  IMAGE_NOT_FOUND: "Hình ảnh không tồn tại.",
  COMMENT_NOT_FOUND: "Bình luận không tồn tại.",
  SAVED_IMAGE_NOT_FOUND: "Hình ảnh đã lưu không tồn tại.",
  IMAGE_ALREADY_SAVED: "Hình ảnh đã được lưu bởi người dùng này.",
  UNAUTHORIZED_ACCESS: "Truy cập không được phép.",
  TOKEN_MISSING: "Token xác thực bị thiếu.",
  INVALID_TOKEN: "Token xác thực không hợp lệ.",
  IMAGE_DELETED_SUCCESS: "Hình ảnh đã được xóa thành công.",
  COMMENT_ADDED_SUCCESS: "Bình luận đã được thêm thành công.",
  IMAGE_SAVED_SUCCESS: "Hình ảnh đã được lưu thành công.",
  IMAGE_UNSAVED_SUCCESS: "Hình ảnh đã được bỏ lưu thành công.",
};
