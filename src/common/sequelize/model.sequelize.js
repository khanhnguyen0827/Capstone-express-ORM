import {  DataTypes, Sequelize } from 'sequelize';

import sequelize from './init.sequelize.js'; // Import instance sequelize đã được khởi tạo

// Lấy dữ liệu từ bảng Roles bằng Sequelize
// code frist tạo model Roles
const Roles = sequelize.define('Roles', // Định nghĩa model Roles
    {
    // Tạo một model bằng Sequelize
    // Định nghĩa các trường dữ liệu trong bảng Roles
    id: {
      type: Sequelize.INTEGER,
      // Định nghĩa trường id là kiểu INTEGER
      primaryKey: true,
      // Đặt id là khóa chính
      // Tự động tăng giá trị id bằng cơ sở dữ liệu MySQL
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,//
        // Định nghĩa trường name là kiểu STRING
        
      allowNull: false,
        // Không cho phép trường name là null
    },
    description: {
      type: Sequelize.STRING,
      // Định nghĩa trường description là kiểu STRING
      allowNull: true,
      // Cho phép trường description là null
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      // Định nghĩa trường isActive là kiểu BOOLEAN
      allowNull: false,
      // Không cho phép trường isActive là null
      defaultValue: 0,
      // Đặt giá trị mặc định của trường isActive là true
    },
    deletedBy: {
      type: Sequelize.INTEGER,
      // Định nghĩa trường deletedBy là kiểu INTEGER
      allowNull: true,
      // Cho phép trường deletedBy là null
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      // Định nghĩa trường isDeleted là kiểu BOOLEAN
      allowNull: false,
      // Cho phép trường deletedAt là null
    },
    deletedAt: {
      type: "TIMESTAMP",
      // Định nghĩa trường deletedAt là kiểu TIMESTAMP
      allowNull: true,
      
    },
        // Đặt giá trị mặc định của trường deletedAt là thời gian hiện tại
    createdAt: {
      type: "TIMESTAMP",
      // Định nghĩa trường createdAt là kiểu TIMESTAMP
      allowNull: true,
      // Cho phép trường createdAt là null
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: "TIMESTAMP",
      // Định nghĩa trường updatedAt là kiểu TIMESTAMP
      allowNull: true,
      // Cho phép trường updatedAt là null
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },

  },
  {
    // Định nghĩa bảng Roles
    tableName: 'Roles',
    // Tên bảng trong cơ sở dữ liệu MySQL
    timestamps: false,// Tắt tính năng tự động tạo trường createdAt và updatedAt
    // Tắt tính năng tự động tạo trường createdAt và updatedAt
    // Cho phép trường createdAt và updatedAt
  } 
);

// Đồng bộ hóa mô hình với cơ sở dữ liệu MySQL
Roles.sync()
  // Sử dụng async/await để lấy dữ liệu từ cơ sở dữ liệu MySQL bằng Sequelize


  export default Roles; // Xuất mô hình Roles để sử dụng trong các module khác