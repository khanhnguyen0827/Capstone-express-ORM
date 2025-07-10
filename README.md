
Capstone-express-ORM

**Yêu cầu chỉ tạo API Back End (có thể có code luôn Front End để nâng cao năng lực bản thân) dựa theo các layout đã có phía dưới:**

* Bạn có thể tạo database theo mô hình ERD phía dưới, hoặc tự mình phân tích.
* Ngoài các tính năng yêu cầu, có thể thêm và mở rộng các tính năng mà bạn muốn (khuyến khích).
* Tạo các API để thao tác dữ liệu tương ứng các trang phía dưới:
    * POST trang đăng ký.
    * POST trang đăng nhập.
* Trang chủ:
    * GET danh sách ảnh về.
    * GET tìm kiếm danh sách ảnh theo tên.
* Trang chi tiết:
    * GET thông tin ảnh và người tạo ảnh bằng id ảnh.
    * GET thông tin bình luận theo id ảnh.
    * GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu hay chưa ở nút Save).
    * POST để lưu thông tin bình luận của người dùng với hình ảnh.
* Trang quản lý ảnh:
    * GET thông tin user.
    * GET danh sách ảnh đã lưu theo user id.
    * GET danh sách ảnh đã tạo theo user id.
    * DELETE xóa ảnh đã tạo theo id ảnh.


    --docker run --name Capstone-express-ORM -e MYSQL_ROOT_PASSWORD=123456 -p 3307:3306 -d mysql:latest