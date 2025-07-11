DROP DATABASE IF EXISTS db_capstone_image;
CREATE DATABASE db_capstone_image;
USE db_capstone_image;

-- ----------------------------------------------------------------
-- Bước 2: Định nghĩa cấu trúc các bảng
-- ----------------------------------------------------------------

-- Bảng: users
-- Lưu trữ thông tin tài khoản người dùng.
CREATE TABLE `Users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- mặc định luôn luôn có
    
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `fullName` VARCHAR(255),
    `avatar` VARCHAR(255),
    `password` VARCHAR(255),
    `facebookId` VARCHAR(255) UNIQUE,
    `googleId` VARCHAR(255) UNIQUE, 
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: images
-- Stores information about uploaded images.
CREATE TABLE `images` (
    `image_id` INT AUTO_INCREMENT PRIMARY KEY,
    `image_name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `user_id` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE SET NULL -- If user is deleted, their images remain but are not attributed to anyone
) COMMENT='Lưu trữ thông tin về các hình ảnh đã được tải lên';

-- Table: comments
-- Stores comments made by users on images.
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    image_id INT,
    content TEXT NOT NULL,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE CASCADE -- If image or user is deleted, comments are also deleted
) COMMENT='Lưu trữ các bình luận của người dùng về hình ảnh';

-- Table: saved_images
-- Bảng trung gian để quản lý mối quan hệ nhiều-nhiều giữa người dùng và các hình ảnh đã lưu.
CREATE TABLE saved_images (
    user_id INT,
    image_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, image_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(image_id) ON DELETE CASCADE
) COMMENT='Bảng trung gian cho việc người dùng lưu hình ảnh';

-- ----------------------------------------------------------------
-- Bước 3: Tạo chỉ mục (index) để tối ưu hóa hiệu suất
-- ----------------------------------------------------------------

CREATE INDEX idx_image_name ON images(image_name);
CREATE INDEX idx_comment_image ON comments(image_id);
CREATE INDEX idx_saved_image ON saved_images(image_id);

-- ----------------------------------------------------------------
-- Bước 4: Thêm dữ liệu mẫu để kiểm tra
-- ----------------------------------------------------------------

-- Insert sample data into the 'Users' table
INSERT INTO `Users` (`email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`) VALUES
('john.doe@example.com', 'John Doe', 'avatar_john.jpg', 'hashed_password_1', NULL, NULL),
('jane.smith@example.com', 'Jane Smith', 'avatar_jane.jpg', 'hashed_password_2', 'fb_jane_123', NULL),
('peter.jones@example.com', 'Peter Jones', 'avatar_peter.jpg', 'hashed_password_3', NULL, 'google_peter_456'),
('alice.brown@example.com', 'Alice Brown', 'avatar_alice.jpg', 'hashed_password_4', NULL, NULL);

-- Insert sample data into the 'images' table
INSERT INTO `images` (`image_name`, `path`, `description`, `user_id`) VALUES
('Mountain View', 'images/mountain_view.jpg', 'A beautiful view of the mountains at sunset.', 1),
('City Lights', 'images/city_lights.png', 'Night view of a bustling city.', 2),
('Forest Path', 'images/forest_path.jpeg', 'A serene path through a dense forest.', 1),
('Ocean Sunset', 'images/ocean_sunset.webp', 'Vibrant colors of a sunset over the ocean.', 3),
('Abstract Art', 'images/abstract_art.jpg', 'A modern abstract painting.', 4);

-- Insert sample data into the 'comments' table
INSERT INTO `comments` (`user_id`, `image_id`, `content`) VALUES
(1, 2, 'Amazing shot! The city lights are stunning.'),
(2, 1, 'Love the colors in this mountain view.'),
(3, 1, 'So peaceful! Wish I was there.'),
(4, 3, 'Great composition, very calming.'),
(1, 4, 'Breathtaking sunset!'),
(2, 5, 'Very thought-provoking piece.'),
(3, 2, 'What a vibrant city!'),
(4, 1, 'This makes me want to go hiking!');

-- Insert sample data into the 'saved_images' table
INSERT INTO `saved_images` (`user_id`, `image_id`) VALUES
(1, 4), -- John Doe saves Ocean Sunset
(1, 2), -- John Doe saves City Lights
(2, 1), -- Jane Smith saves Mountain View
(3, 3), -- Peter Jones saves Forest Path
(4, 5), -- Alice Brown saves Abstract Art
(2, 4); -- Jane Smith saves Ocean Sunset

SELECT 'Thiết lập và khởi tạo dữ liệu cho database đã hoàn tất.' AS status;
