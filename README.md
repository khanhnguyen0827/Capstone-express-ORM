# Image Gallery API

API backend cho ứng dụng gallery ảnh được xây dựng với Node.js, Express, Prisma và MySQL.

## 🚀 Tính năng

### Authentication
- ✅ Đăng ký tài khoản
- ✅ Đăng nhập
- ✅ JWT Authentication
- ✅ Google OAuth (tùy chọn)
- ✅ Refresh Token

### Trang chủ
- ✅ Lấy danh sách tất cả ảnh
- ✅ Tìm kiếm ảnh theo tên
- ✅ Phân trang

### Trang chi tiết ảnh
- ✅ Xem thông tin chi tiết ảnh và người tạo
- ✅ Xem danh sách bình luận
- ✅ Kiểm tra trạng thái đã lưu ảnh
- ✅ Thêm bình luận
- ✅ Lưu ảnh

### Trang quản lý
- ✅ Xem thông tin user
- ✅ Xem danh sách ảnh đã lưu
- ✅ Xem danh sách ảnh đã tạo
- ✅ Xóa ảnh đã tạo
- ✅ Cập nhật profile
- ✅ Thống kê user

## 🛠️ Công nghệ sử dụng

- **Backend**: Node.js, Express.js
- **Database**: MySQL với Prisma ORM
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer, Cloudinary (tùy chọn)
- **Documentation**: Swagger/OpenAPI
- **Validation**: Custom middleware

## 📋 Yêu cầu hệ thống

- Node.js >= 16.x
- MySQL >= 8.0
- npm hoặc yarn

## ⚡ Cài đặt và chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd image-gallery-api
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình database
Tạo database MySQL:
```sql
CREATE DATABASE image_gallery_db;
```

### 4. Cấu hình environment variables
Tạo file `.env` và cập nhật các thông tin:
```env
# Database
DATABASE_URL="mysql://root:123456@localhost:3307/image_gallery_db"

# JWT Secrets
ACCESS_TOKEN_SECRET="your_access_token_secret_here"
REFRESH_TOKEN_SECRET="your_refresh_token_secret_here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Server
PORT=8080
NODE_ENV=development
```

### 5. Sync database schema
```bash
npm run db:push
```

### 6. Generate Prisma client
```bash
npm run db:generate
```

### 7. Chạy server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:8080`

## 📚 API Documentation

Sau khi chạy server, truy cập Swagger documentation tại:
`http://localhost:8080/api-docs`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile
- `POST /api/auth/google-login` - Đăng nhập Google
- `POST /api/auth/refresh-token` - Refresh token

### Images
- `GET /api/images` - Danh sách ảnh (trang chủ)
- `GET /api/images/search?name={name}` - Tìm kiếm ảnh
- `GET /api/images/:id` - Chi tiết ảnh
- `GET /api/images/:id/comments` - Bình luận của ảnh
- `GET /api/images/:id/saved/:userId` - Kiểm tra đã lưu
- `POST /api/images/:id/comments` - Thêm bình luận
- `POST /api/images/:id/save` - Lưu ảnh
- `POST /api/images` - Tạo ảnh mới
- `DELETE /api/images/:id` - Xóa ảnh

### Users
- `GET /api/users/:id` - Thông tin user
- `GET /api/users/:id/saved-images` - Ảnh đã lưu
- `GET /api/users/:id/created-images` - Ảnh đã tạo
- `GET /api/users/:id/stats` - Thống kê user
- `PUT /api/users/:id` - Cập nhật profile

## 🗄️ Database Schema

### Users
- `user_id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password_hash`
- `full_name`
- `created_at`

### Images
- `image_id` (Primary Key)
- `user_id` (Foreign Key)
- `image_name`
- `image_url`
- `description`
- `created_at`

### Comments
- `comment_id` (Primary Key)
- `user_id` (Foreign Key)
- `image_id` (Foreign Key)
- `comment_text`
- `created_at`

### SavedImages
- `saved_id` (Primary Key)
- `user_id` (Foreign Key)
- `image_id` (Foreign Key)
- `saved_at`
- Unique constraint: `(user_id, image_id)`

## 🔐 Authentication

API sử dụng JWT Bearer Token authentication. Để truy cập các endpoint được bảo vệ:

1. Đăng nhập để lấy access token
2. Thêm header: `Authorization: Bearer <access_token>`

## 📝 Ví dụ sử dụng

### Đăng ký tài khoản
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "Nguyễn Văn A"
  }'
```

### Đăng nhập
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Lấy danh sách ảnh
```bash
curl -X GET http://localhost:8080/api/images?page=1&limit=20
```

### Tìm kiếm ảnh
```bash
curl -X GET "http://localhost:8080/api/images/search?name=sunset&page=1&limit=10"
```

### Thêm bình luận (cần authentication)
```bash
curl -X POST http://localhost:8080/api/images/1/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "comment_text": "Ảnh đẹp quá!"
  }'
```

## 🚀 Deployment

### Sử dụng PM2
```bash
npm install -g pm2
pm2 start server.js --name "image-gallery-api"
```

### Docker (tùy chọn)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 8080
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the ISC License.

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue trên GitHub repository.

---

**Lưu ý**: Đây là API backend, để có giao diện người dùng hoàn chỉnh, bạn cần phát triển thêm frontend (React, Vue, Angular, etc.) hoặc sử dụng các công cụ test API như Postman, Insomnia.
