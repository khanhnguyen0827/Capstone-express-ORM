# be_cyber_community

## Mô tả dự án
Dự án be_cyber_community là một API backend xây dựng bằng Node.js và Express, cung cấp các chức năng quản lý người dùng (xác thực, đăng ký, đăng nhập, đăng xuất, làm mới token) và quản lý hình ảnh (lấy danh sách, tìm kiếm, xem chi tiết, bình luận, lưu và xóa hình ảnh).

## Công nghệ sử dụng
- Node.js
- Express 5.x
- MySQL (sử dụng Prisma và Sequelize làm ORM)
- JWT (JSON Web Token) cho xác thực
- Bcrypt để mã hóa mật khẩu
- Swagger để tạo tài liệu API
- Nodemailer để gửi email
- Google Auth Library để đăng nhập bằng Google
- Morgan và Chalk để log API
- CORS để phân quyền truy cập

## Cài đặt
1. Clone repository về máy:
```bash
git clone <repository-url>
```
2. Cài đặt các package:
```bash
npm install
```
3. Tạo file `.env` và cấu hình biến môi trường, ví dụ:
```
DATABASE_URL="mysql://root:password@localhost:3306/db_name"
JWT_SECRET="your_jwt_secret"
```
4. Thiết lập cơ sở dữ liệu (có thể sử dụng file `database_setup.sql` hoặc Prisma để đồng bộ):
```bash
npx prisma db pull
npx prisma generate
```

## Cách chạy
- Chạy server ở chế độ production:
```bash
npm run start
```
- Chạy server ở chế độ phát triển (có nodemon tự động reload):
```bash
npm run dev
```
Server sẽ chạy trên cổng `3069`.

## Các API chính

### 1. Xác thực người dùng (Auth)
- `POST /auth/register`: Đăng ký người dùng mới
- `POST /auth/login`: Đăng nhập
- `GET /auth/get-info`: Lấy thông tin người dùng (cần token)
- `POST /auth/google-login`: Đăng nhập bằng Google
- `POST /auth/refresh-token`: Làm mới token
- `POST /auth/logout`: Đăng xuất

### 2. Quản lý hình ảnh (Images)
- `GET /images`: Lấy danh sách tất cả hình ảnh
- `GET /images/search?name=`: Tìm kiếm hình ảnh theo tên
- `GET /images/:image_id`: Lấy chi tiết hình ảnh theo ID
- `GET /images/:image_id/comments`: Lấy danh sách bình luận của hình ảnh
- `GET /images/:image_id/is-saved`: Kiểm tra hình ảnh đã được lưu bởi người dùng chưa
- `POST /images/:image_id/comments`: Đăng bình luận mới cho hình ảnh
- `DELETE /images/:image_id`: Xóa hình ảnh theo ID

## Tài liệu API (Swagger)

Dự án sử dụng Swagger để tạo tài liệu API. Bạn có thể truy cập tài liệu tại endpoint `/api-docs` trên server (ví dụ: http://localhost:3069/api-docs).

### Các API xác thực (Auth)

- `POST /auth/register`: Đăng ký tài khoản người dùng mới  
  Yêu cầu body: fullName, email, password  
  Trả về: 200 Đăng ký thành công

- `POST /auth/login`: Đăng nhập vào hệ thống  
  Yêu cầu body: email, password  
  Trả về: 200 Đăng nhập thành công

- `GET /auth/get-info`: Lấy thông tin người dùng đã xác thực  
  Yêu cầu token Bearer  
  Trả về: 200 Thông tin người dùng

- `POST /auth/google-login`: Đăng nhập bằng Google  
  Yêu cầu body: code (mã xác thực Google)  
  Trả về: 200 Đăng nhập Google thành công

- `POST /auth/refresh-token`: Làm mới token  
  Yêu cầu body: accessToken, refreshToken  
  Trả về: 200 Làm mới token thành công

- `POST /auth/logout`: Đăng xuất người dùng  
  Trả về: 200 Đăng xuất thành công

### Các API quản lý hình ảnh (Images)

- `GET /images`: Lấy danh sách tất cả hình ảnh  
  Trả về: 200 Danh sách hình ảnh

- `GET /images/search?name=`: Tìm kiếm hình ảnh theo tên  
  Trả về: 200 Danh sách hình ảnh tìm được

- `GET /images/:image_id`: Lấy chi tiết hình ảnh theo ID  
  Trả về: 200 Thông tin chi tiết hình ảnh

- `GET /images/:image_id/comments`: Lấy danh sách bình luận của hình ảnh  
  Trả về: 200 Danh sách bình luận

- `GET /images/:image_id/is-saved`: Kiểm tra hình ảnh đã được lưu bởi người dùng chưa  
  Trả về: 200 Trạng thái lưu hình ảnh (isSaved: true/false)

- `POST /images/:image_id/comments`: Đăng bình luận mới cho hình ảnh  
  Yêu cầu body: content (nội dung bình luận)  
  Trả về: 201 Bình luận được tạo thành công

- `DELETE /images/:image_id`: Xóa hình ảnh theo ID  
  Trả về: 204 Xóa thành công

---

README này cung cấp hướng dẫn cơ bản để cài đặt, chạy và sử dụng các API chính của dự án be_cyber_community.
