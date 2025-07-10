-- Tạo cơ sở dữ liệu mới
CREATE DATABASE IF NOT EXISTS image_gallery_db;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE image_gallery_db;

-- Bảng Users để lưu trữ thông tin người dùng
-- Bao gồm các trường cơ bản như ID, tên người dùng, email, mật khẩu
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Lưu trữ hash của mật khẩu
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Images để lưu trữ thông tin về các hình ảnh
-- Bao gồm ID hình ảnh, ID người tạo, tên hình ảnh, đường dẫn URL, mô tả
CREATE TABLE IF NOT EXISTS Images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- ID của người tạo hình ảnh
    image_name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL, -- Đường dẫn URL đến hình ảnh
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE -- Khi người dùng bị xóa, hình ảnh của họ cũng bị xóa
);

-- Bảng Comments để lưu trữ các bình luận về hình ảnh
-- Bao gồm ID bình luận, ID người dùng, ID hình ảnh, nội dung bình luận
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- ID của người bình luận
    image_id INT NOT NULL, -- ID của hình ảnh được bình luận
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES Images(image_id) ON DELETE CASCADE
);

-- Bảng SavedImages để lưu trữ các hình ảnh mà người dùng đã lưu
-- Bao gồm ID lưu, ID người dùng, ID hình ảnh
CREATE TABLE IF NOT EXISTS SavedImages (
    saved_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- ID của người dùng đã lưu
    image_id INT NOT NULL, -- ID của hình ảnh được lưu
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, image_id), -- Đảm bảo một người dùng không thể lưu cùng một hình ảnh nhiều lần
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES Images(image_id) ON DELETE CASCADE
);

-- Thêm một số dữ liệu mẫu
INSERT INTO Users (username, email, password_hash, full_name) VALUES
('alice_wonder', 'alice.w@example.com', 'hashed_pw_alice', 'Alice Wonderland'),
('bob_builder', 'bob.b@example.com', 'hashed_pw_bob', 'Bob The Builder'),
('charlie_chaplin', 'charlie.c@example.com', 'hashed_pw_charlie', 'Charlie Chaplin');

INSERT INTO Images (user_id, image_name, image_url, description) VALUES
(1, 'Mystic Forest', 'https://placehold.co/600x400/90EE90/000000?text=Mystic+Forest', 'A serene and mystical forest scene.'),
(1, 'Mountain Peak', 'https://placehold.co/600x400/87CEEB/000000?text=Mountain+Peak', 'Breathtaking view from a high mountain peak.'),
(2, 'Urban Sunset', 'https://placehold.co/600x400/FFD700/000000?text=Urban+Sunset', 'A vibrant sunset over a bustling city.'),
(3, 'Ocean Waves', 'https://placehold.co/600x400/4682B4/FFFFFF?text=Ocean+Waves', 'Powerful ocean waves crashing on the shore.');

INSERT INTO Comments (user_id, image_id, comment_text) VALUES
(2, 1, 'This forest looks so peaceful!'),
(3, 1, 'I wish I could be there right now.'),
(1, 3, 'The colors in this sunset are incredible!'),
(2, 4, 'Love the power of the ocean.'),
(3, 2, 'What an amazing view!');

INSERT INTO SavedImages (user_id, image_id) VALUES
(1, 3), -- Alice saved Urban Sunset
(2, 1), -- Bob saved Mystic Forest
(2, 2), -- Bob saved Mountain Peak
(3, 1); -- Charlie saved Mystic Forest
