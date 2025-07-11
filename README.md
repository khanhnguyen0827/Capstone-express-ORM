Yêu Cầu API Backend
1. Mục Tiêu Tổng Quát
Phát triển API Backend: Tạo API Backend (có thể bao gồm code Front-end cơ bản để nâng cao năng lực bản thân) dựa trên các layout đã có.

Mô hình Database: Xây dựng mô hình database theo mô hình ERD đã có hoặc tự mình phân tích.

Tính năng mở rộng: Ngoài các tính năng yêu cầu, có thể thêm và mở rộng các tính năng mà bạn muốn (khuyến khích).

2. Các API Cần Triển Khai
Tạo các API để thao tác dữ liệu tương ứng các trang phía dưới:

2.1. Trang Đăng Ký
POST trang đăng ký.

2.2. Trang Đăng Nhập
POST trang đăng nhập.

2.3. Trang Chủ
GET danh sách ảnh về.

GET tìm kiếm danh sách ảnh theo tên.

2.4. Trang Chi Tiết
GET thông tin ảnh và người tạo ảnh bằng id ảnh.

GET thông tin bình luận theo id ảnh.

GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save).

POST để lưu thông tin bình luận của người dùng với hình ảnh.

2.5. Trang Quản Lý Ảnh
GET thông tin user.

GET danh sách ảnh đã lưu user id.

GET danh sách ảnh đã tạo theo user id.

DELETE xóa ảnh đã tạo theo id ảnh.
