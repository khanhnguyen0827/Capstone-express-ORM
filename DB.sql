

CREATE DATABASE IF NOT EXISTS db_cyber_community; 
USE db_cyber_community;





-- Tắt kiểm tra khóa ngoại tạm thời để tránh lỗi khi DROP TABLE
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa các bảng nếu chúng đã tồn tại để đảm bảo môi trường sạch
DROP TABLE IF EXISTS `ChatMessages`;
DROP TABLE IF EXISTS `ChatGroupMembers`;
DROP TABLE IF EXISTS `ChatGroups`;
DROP TABLE IF EXISTS `SavedImages`; -- Thêm bảng mới vào danh sách xóa
DROP TABLE IF EXISTS `Articles`;
DROP TABLE IF EXISTS `RolePermission`;
DROP TABLE IF EXISTS `Permissions`;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Roles`;


-- Bảng `Roles`
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int DEFAULT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `Users`
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '2',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `totpSecret` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `googleId` (`googleId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `Permissions`
CREATE TABLE `Permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(100) NOT NULL,
  `module` varchar(100) NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `ChatGroups`
CREATE TABLE `ChatGroups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `ownerId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ownerId` (`ownerId`),
  CONSTRAINT `ChatGroups_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `Articles`
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `imageUrl` varchar(500) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `SavedImages` (Bảng mới để lưu ảnh đã lưu)
CREATE TABLE `SavedImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `articleId` int NOT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_article_unique` (`userId`, `articleId`), -- Đảm bảo mỗi người dùng chỉ lưu một bài viết một lần
  KEY `userId` (`userId`),
  KEY `articleId` (`articleId`),
  CONSTRAINT `SavedImages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `SavedImages_ibfk_2` FOREIGN KEY (`articleId`) REFERENCES `Articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `RolePermission`
CREATE TABLE `RolePermission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `RolePermission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`),
  CONSTRAINT `RolePermission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `Permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `ChatGroupMembers`
CREATE TABLE `ChatGroupMembers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `chatGroupId` int DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `chatGroupId` (`chatGroupId`),
  CONSTRAINT `ChatGroupMembers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `ChatGroupMembers_ibfk_2` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng `ChatMessages`
CREATE TABLE `ChatMessages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `chatGroupId` int NOT NULL,
  `userIdSender` int NOT NULL,
  `messageText` text,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chatGroupId` (`chatGroupId`),
  KEY `userIdSender` (`userIdSender`),
  CONSTRAINT `ChatMessages_ibfk_1` FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups` (`id`),
  CONSTRAINT `ChatMessages_ibfk_2` FOREIGN KEY (`userIdSender`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;


-- Dữ liệu mẫu cho bảng `Roles`
INSERT INTO `Roles` (`id`, `name`, `description`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Quản trị viên hệ thống', 1, NULL, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'User', 'Người dùng thông thường', 1, NULL, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dữ liệu mẫu cho bảng `Users`
-- Mật khẩu ở đây chỉ là ví dụ và cần được hash trong thực tế
INSERT INTO `Users` (`id`, `email`, `fullName`, `avatar`, `password`, `facebookId`, `googleId`, `roleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`, `totpSecret`) VALUES
(1, 'admin@example.com', 'Admin User', 'https://placehold.co/100x100/000000/FFFFFF?text=AD', '$2a$10$abcdefghijklmnopqrstuvw.xyz', NULL, NULL, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(2, 'user1@example.com', 'User One', 'https://placehold.co/100x100/FF0000/FFFFFF?text=U1', '$2a$10$abcdefghijklmnopqrstuvw.xyz', NULL, NULL, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL),
(3, 'user2@example.com', 'User Two', 'https://placehold.co/100x100/00FF00/FFFFFF?text=U2', '$2a$10$abcdefghijklmnopqrstuvw.xyz', NULL, NULL, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);

-- Dữ liệu mẫu cho bảng `Articles`
INSERT INTO `Articles` (`id`, `title`, `content`, `imageUrl`, `views`, `userId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Bài viết đầu tiên của User One', 'Đây là nội dung của bài viết đầu tiên được tạo bởi User One. Nội dung này có thể khá dài để kiểm tra hiển thị.', 'https://placehold.co/600x400/0000FF/FFFFFF?text=Article+1', 150, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Bài viết thứ hai của User Two', 'Nội dung của bài viết thứ hai, được viết bởi User Two. Bài viết này nói về một chủ đề thú vị.', 'https://placehold.co/600x400/FFFF00/000000?text=Article+2', 230, 3, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Bài viết hấp dẫn từ User One', 'Một bài viết khác từ User One, với nhiều thông tin hữu ích và hình ảnh minh họa.', 'https://placehold.co/600x400/FF00FF/FFFFFF?text=Article+3', 80, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dữ liệu mẫu cho bảng `SavedImages`
INSERT INTO `SavedImages` (`userId`, `articleId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User One lưu Bài viết 1
(2, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User One lưu Bài viết 2
(3, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- User Two lưu Bài viết 1

-- Dữ liệu mẫu cho bảng `ChatGroups`
INSERT INTO `ChatGroups` (`id`, `name`, `ownerId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Nhóm chung', 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Nhóm bạn bè của User One', 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dữ liệu mẫu cho bảng `ChatGroupMembers`
INSERT INTO `ChatGroupMembers` (`id`, `userId`, `chatGroupId`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Admin là thành viên nhóm chung
(2, 2, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User One là thành viên nhóm chung
(3, 3, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User Two là thành viên nhóm chung
(4, 2, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User One là thành viên nhóm của mình
(5, 3, 2, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- User Two cũng là thành viên nhóm của User One

-- Dữ liệu mẫu cho bảng `ChatMessages`
INSERT INTO `ChatMessages` (`id`, `chatGroupId`, `userIdSender`, `messageText`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Chào mừng mọi người đến với nhóm chung!', 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 2, 'Chào Admin và User Two!', 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 1, 3, 'Chào mọi người!', 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 2, 2, 'Chào User Two, sao rồi?', 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 2, 3, 'Mình ổn, cảm ơn User One.', 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Dữ liệu mẫu cho bảng `Permissions`
INSERT INTO `Permissions` (`id`, `name`, `endpoint`, `method`, `module`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Xem danh sách bài viết', '/articles', 'GET', 'Articles', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Tạo bài viết mới', '/articles', 'POST', 'Articles', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Xóa bài viết', '/articles/:id', 'DELETE', 'Articles', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Quản lý người dùng', '/users', 'GET', 'Users', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Gửi tin nhắn', '/chat/messages', 'POST', 'Chat', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Lưu bài viết', '/articles/:id/save', 'POST', 'Articles', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Thêm quyền mới
(7, 'Kiểm tra bài viết đã lưu', '/articles/:id/isSaved', 'GET', 'Articles', 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- Thêm quyền mới

-- Dữ liệu mẫu cho bảng `RolePermission`
INSERT INTO `RolePermission` (`id`, `roleId`, `permissionId`, `isActive`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Admin có thể xem bài viết
(2, 1, 2, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Admin có thể tạo bài viết
(3, 1, 3, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Admin có thể xóa bài viết
(4, 1, 4, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Admin có thể quản lý người dùng
(5, 2, 1, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User có thể xem bài viết
(6, 2, 2, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User có thể tạo bài viết
(7, 2, 5, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User có thể gửi tin nhắn
(8, 2, 6, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- User có thể lưu bài viết
(9, 2, 7, 1, 0, 0, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- User có thể kiểm tra bài viết đã lưu

