Đây là lược đồ cơ sở dữ liệu MySQL với chú thích bằng tiếng Việt và một số dữ liệu mẫu để bạn có thể kiểm tra.

-- Cơ sở dữ liệu: image_gallery_db
-- Đây là tên cơ sở dữ liệu bạn có thể tạo trước khi chạy các lệnh này.
-- Ví dụ: CREATE DATABASE image_gallery_db;
-- USE image_gallery_db;

-- Bảng: Users (Người dùng)
-- Lưu trữ thông tin về người dùng của ứng dụng.
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi người dùng
    username VARCHAR(255) NOT NULL UNIQUE, -- Tên đăng nhập, phải là duy nhất
    email VARCHAR(255) NOT NULL UNIQUE, -- Email của người dùng, phải là duy nhất
    password_hash VARCHAR(255) NOT NULL, -- Mã băm của mật khẩu (nên được băm an toàn)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Thời gian tạo tài khoản
);

-- Bảng: Images (Hình ảnh)
-- Lưu trữ thông tin về các hình ảnh được tải lên.
CREATE TABLE Images (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi hình ảnh
    user_id INT NOT NULL, -- ID của người dùng đã tải lên hình ảnh này (khóa ngoại đến bảng Users)
    title VARCHAR(255) NOT NULL, -- Tiêu đề của hình ảnh
    description TEXT, -- Mô tả chi tiết về hình ảnh (có thể để trống)
    image_url VARCHAR(255) NOT NULL, -- URL hoặc đường dẫn đến tệp hình ảnh
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tải lên hình ảnh
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE -- Khi người dùng bị xóa, tất cả hình ảnh của họ cũng sẽ bị xóa
);

-- Bảng: Comments (Bình luận)
-- Lưu trữ các bình luận của người dùng về hình ảnh.
CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi bình luận
    image_id INT NOT NULL, -- ID của hình ảnh được bình luận (khóa ngoại đến bảng Images)
    user_id INT NOT NULL, -- ID của người dùng đã bình luận (khóa ngoại đến bảng Users)
    comment_text TEXT NOT NULL, -- Nội dung của bình luận
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian bình luận được tạo
    FOREIGN KEY (image_id) REFERENCES Images(id) ON DELETE CASCADE, -- Khi hình ảnh bị xóa, các bình luận liên quan cũng sẽ bị xóa
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE -- Khi người dùng bị xóa, các bình luận của họ cũng sẽ bị xóa
);

-- Bảng: SavedImages (Hình ảnh đã lưu)
-- Lưu trữ thông tin về các hình ảnh mà người dùng đã lưu (yêu thích).
CREATE TABLE SavedImages (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi bản ghi lưu
    user_id INT NOT NULL, -- ID của người dùng đã lưu hình ảnh (khóa ngoại đến bảng Users)
    image_id INT NOT NULL, -- ID của hình ảnh đã được lưu (khóa ngoại đến bảng Images)
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian hình ảnh được lưu
    UNIQUE (user_id, image_id), -- Đảm bảo một người dùng chỉ có thể lưu một hình ảnh một lần
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE, -- Khi người dùng bị xóa, các hình ảnh đã lưu của họ cũng sẽ bị xóa
    FOREIGN KEY (image_id) REFERENCES Images(id) ON DELETE CASCADE -- Khi hình ảnh bị xóa, các bản ghi lưu liên quan cũng sẽ bị xóa
);

-- Dữ liệu mẫu để kiểm tra

-- Chèn dữ liệu vào bảng Users
INSERT INTO Users (username, email, password_hash) VALUES
('nguyenvana', 'nguyenvana@example.com', 'hashed_password_1'), -- Mật khẩu đã được băm
('tranvanb', 'tranvanb@example.com', 'hashed_password_2'),   -- Mật khẩu đã được băm
('lethic', 'lethic@example.com', 'hashed_password_3');     -- Mật khẩu đã được băm

-- Chèn dữ liệu vào bảng Images
INSERT INTO Images (user_id, title, description, image_url) VALUES
(1, 'Phong cảnh núi non', 'Một bức ảnh đẹp về núi non hùng vĩ.', 'https://placehold.co/600x400/000000/FFFFFF?text=Mountain'),
(1, 'Thành phố về đêm', 'Ánh đèn lung linh của thành phố khi màn đêm buông xuống.', 'https://placehold.co/600x400/000000/FFFFFF?text=CityNight'),
(2, 'Bãi biển hoàng hôn', 'Hoàng hôn tuyệt đẹp trên bãi biển yên bình.', 'https://placehold.co/600x400/000000/FFFFFF?text=SunsetBeach'),
(3, 'Động vật hoang dã', 'Một chú sư tử đang nghỉ ngơi trong tự nhiên.', 'https://placehold.co/600x400/000000/FFFFFF?text=Wildlife');

-- Chèn dữ liệu vào bảng Comments
INSERT INTO Comments (image_id, user_id, comment_text) VALUES
(1, 2, 'Bức ảnh này thật tuyệt vời!'),
(1, 3, 'Tôi rất thích phong cảnh này.'),
(2, 1, 'Thành phố về đêm luôn có vẻ đẹp riêng.'),
(3, 1, 'Hoàng hôn trên biển luôn lãng mạn.'),
(4, 2, 'Chú sư tử trông rất uy nghiêm.');

-- Chèn dữ liệu vào bảng SavedImages
INSERT INTO SavedImages (user_id, image_id) VALUES
(1, 3), -- Người dùng 1 lưu hình ảnh 3
(2, 1), -- Người dùng 2 lưu hình ảnh 1
(3, 2), -- Người dùng 3 lưu hình ảnh 2
(1, 4); -- Người dùng 1 lưu hình ảnh 4
