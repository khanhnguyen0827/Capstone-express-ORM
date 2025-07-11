import mysql from 'mysql2/promise';

import { URL_DATABASE } from '../constant/app.constant.js'; // Import URL_DATABASE from config.js
// Import mysql2/promise for async/await support


 // Kết nối đến cơ sở dữ liệu MySQL
// Sử dụng mysql2/promise để hỗ trợ async/await trên cơ sở dữ liệu MySQL
const pool = mysql.createPool({
  uri: URL_DATABASE,});
// Tạo một pool kết nối đến cơ sở dữ liệu MySQL

// Kiểm tra kết nối đến cơ sở dữ liệu MySQL
  try {
  // For pool initialization, see above
    // Use pool.query() to execute a query kiểm tra kết nối
  await pool.query('SELECT 1');
    console.log("MySQL: Kết nối đến cơ sở dữ liệu MySQL thành công!");
} catch (err) {
  console.log(err, "MySQL2: Kết nối đến cơ sở dữ liệu MySQL khó tạo!");
}


// Export the pool for use in other modules
export default pool;