# Dự án API Backend Quản lý Hình ảnh

Dự án này tập trung vào việc phát triển **API Backend** cho một hệ thống quản lý hình ảnh. Mặc dù trọng tâm chính là phần backend, việc phát triển này sẽ tạo nền tảng vững chắc để tích hợp với một **Front End** sau này, nhằm nâng cao khả năng và kỹ năng của người thực hiện.

## I. Yêu cầu chung

* **Tạo API Backend**: Chỉ yêu cầu phát triển phần backend. Có thể hình dung có một Front End để tương tác và kiểm tra.
* **Thiết kế Database**: Xây dựng cơ sở dữ liệu dựa trên mô hình ERD được cung cấp (nếu có), hoặc tự mình phân tích và thiết kế.
* **Mở rộng tính năng**: Ngoài các tính năng yêu cầu dưới đây, bạn có thể tự do mở rộng và bổ sung các tính năng khác mà bạn thấy cần thiết hoặc muốn (được khuyến khích).

## II. Các API cần phát triển

Dưới đây là danh sách các API cần được triển khai, được phân nhóm theo chức năng và trang tương ứng:

### 1. API Xác thực và Đăng ký

* **POST `/register`**: Đăng ký tài khoản người dùng mới.
* **POST `/login`**: Đăng nhập vào hệ thống.

### 2. API Trang chủ

* **GET `/images`**: Lấy danh sách tất cả các hình ảnh có trong hệ thống.
* **GET `/images/search?name={image_name}`**: Tìm kiếm danh sách hình ảnh dựa trên tên hình ảnh.

### 3. API Trang chi tiết hình ảnh

* **GET `/images/{image_id}`**: Lấy thông tin chi tiết của một hình ảnh cụ thể và thông tin của người tạo ra hình ảnh đó.
* **GET `/images/{image_id}/comments`**: Lấy danh sách bình luận của một hình ảnh cụ thể.
* **GET `/images/{image_id}/is-saved`**: Kiểm tra xem hình ảnh này đã được người dùng hiện tại lưu (saved) hay chưa (dùng để kiểm tra trạng thái nút "Save" trên Front End).
* **POST `/images/{image_id}/comments`**: Đăng một bình luận mới của người dùng về hình ảnh.

### 4. API Trang quản lý hình ảnh (của người dùng)

* **GET `/users/{user_id}`**: Lấy thông tin chi tiết của một người dùng.
* **GET `/users/{user_id}/saved-images`**: Lấy danh sách các hình ảnh mà người dùng đã lưu.
* **GET `/users/{user_id}/created-images`**: Lấy danh sách các hình ảnh mà người dùng đã tạo (tải lên).
* **DELETE `/images/{image_id}`**: Xóa một hình ảnh do chính người dùng đó tạo.

## III. Hướng dẫn thiết kế Database

Cần tạo cơ sở dữ liệu và các bảng tương ứng dựa trên các yêu cầu API trên. Một số bảng cơ bản có thể bao gồm:

* **Users**: Lưu trữ thông tin người dùng (ID, tên đăng nhập, mật khẩu, email, v.v.).
* **Images**: Lưu trữ thông tin hình ảnh (ID, tên hình ảnh, mô tả, URL hình ảnh, ID người tạo, ngày tạo, v.v.).
* **Comments**: Lưu trữ các bình luận (ID, nội dung bình luận, ID người dùng, ID hình ảnh, ngày bình luận, v.v.).
* **SavedImages**: Bảng trung gian để quản lý mối quan hệ nhiều-nhiều giữa Users và Images (ID người dùng, ID hình ảnh, ngày lưu, v.v.).

## IV. Đóng góp và Phát triển

Bạn được khuyến khích thêm vào các tính năng hoặc cải tiến khác để làm cho dự án hoàn thiện hơn, ví dụ:

* Chức năng tải lên hình ảnh vật lý.
* Hệ thống phân loại, gắn thẻ (tagging) cho hình ảnh.
* Tối ưu hóa các truy vấn API (ví dụ: phân trang, bộ lọc).
* Triển khai bảo mật nâng cao (ví dụ: xác thực JWT, bảo vệ CSRF).

---