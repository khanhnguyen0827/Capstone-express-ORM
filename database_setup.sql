
DROP DATABASE IF EXISTS db_capstone_image;
CREATE DATABASE db_capstone_image;
USE db_capstone_image;

-- ----------------------------------------------------------------
-- Bước 2: Định nghĩa cấu trúc các bảng
-- ----------------------------------------------------------------

-- Bảng: users
-- Lưu trữ thông tin tài khoản người dùng.
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    age INT,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT='Lưu trữ thông tin tài khoản người dùng';

-- Table: images
-- Stores information about uploaded images.
CREATE TABLE images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL -- Nếu người dùng bị xóa, ảnh của họ vẫn còn nhưng không thuộc về ai
) COMMENT='Lưu trữ thông tin về các hình ảnh đã được tải lên';

-- Table: comments
-- Stores comments made by users on images.
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    image_id INT,
    content TEXT NOT NULL,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE CASCADE -- Nếu ảnh hoặc người dùng bị xóa, bình luận cũng bị xóa theo
) COMMENT='Lưu trữ các bình luận của người dùng về hình ảnh';

-- Table: saved_images
-- Bảng trung gian để quản lý mối quan hệ nhiều-nhiều giữa người dùng và các hình ảnh đã lưu.
CREATE TABLE saved_images (
    user_id INT,
    image_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, image_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE CASCADE
) COMMENT='Bảng trung gian cho việc người dùng lưu hình ảnh';

-- ----------------------------------------------------------------
-- Bước 3: Tạo chỉ mục (index) để tối ưu hóa hiệu suất
-- ----------------------------------------------------------------

CREATE INDEX idx_image_name ON images(image_name);
CREATE INDEX idx_comment_image ON comments(image_id);
CREATE INDEX idx_saved_image ON saved_images(image_id);

-- ----------------------------------------------------------------
-- Bước 4: Chèn dữ liệu mẫu để kiểm thử
-- ----------------------------------------------------------------

-- Dữ liệu mẫu cho Bảng Users
-- Lưu ý: Trong ứng dụng thực tế, password_hash phải được tạo bằng thuật toán băm an toàn như bcrypt.
-- Chuỗi mật khẩu dưới đây chỉ là ví dụ và cần được thay thế bằng mật khẩu đã băm.
INSERT INTO users (email, password_hash, full_name, age, avatar) VALUES
('alice@example.com', '$2b$10$your_hashed_password_here_1', 'Alice Johnson', 28, 'avatars/avatar1.jpg'),
('bob@example.com', '$2b$10$your_hashed_password_here_2', 'Bob Williams', 35, 'avatars/avatar2.jpg'),
('charlie@example.com', '$2b$10$your_hashed_password_here_3', 'Charlie Brown', 22, NULL);

-- Sample Images
INSERT INTO images (image_name, path, description, user_id) VALUES
('Sunset Over Mountains', 'images/sunset.jpg', 'A beautiful sunset over the rocky mountains.', 1),
('City at Night', 'images/city_night.jpg', 'A vibrant cityscape illuminated by night lights.', 2),
('Forest Trail', 'images/forest_trail.jpg', 'A peaceful trail winding through a lush green forest.', 1),
('Abstract Art', 'images/abstract.jpg', 'Colorful abstract painting with dynamic shapes.', 3),
('Ocean Waves', 'images/ocean.jpg', 'Powerful ocean waves crashing on the shore.', 2),
('Northern Lights', 'images/aurora.jpg', 'The magical aurora borealis in the night sky.', 1);

-- Sample Comments
INSERT INTO comments (user_id, image_id, content) VALUES
(2, 1, 'Wow, what a stunning view!'),
(3, 1, 'I wish I was there. Amazing shot!'),
(1, 2, 'Love the colors in this one.'),
(1, 5, 'This makes me want to go to the beach.'),
(2, 3, 'Looks so serene and peaceful.');

-- Dữ liệu mẫu cho Bảng Saved Images
INSERT INTO saved_images (user_id, image_id) VALUES
(1, 2), -- Alice đã lưu ảnh 'City at Night' của Bob
(1, 5), -- Alice đã lưu ảnh 'Ocean Waves' của Bob
(2, 1), -- Bob đã lưu ảnh 'Sunset Over Mountains' của Alice
(3, 1), -- Charlie đã lưu ảnh 'Sunset Over Mountains' của Alice
(3, 2); -- Charlie đã lưu ảnh 'City at Night' của Bob

-- ----------------------------------------------------------------
-- Kết thúc script
-- ----------------------------------------------------------------
SELECT 'Thiết lập và khởi tạo dữ liệu cho database đã hoàn tất.' AS status;
