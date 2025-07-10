import { Sequelize, DataTypes } from 'sequelize';

import { URL_DATABASE } from '../constant/app.constant.js';




// Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize
const sequelize = new Sequelize( URL_DATABASE, {
    logging: false, // Tắt logging để không hiển thị các truy vấn SQL trong console
});
// Kiểm tra kết nối
try {
    await sequelize.authenticate();
    console.log('sequelize: Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize thành công!');    
} catch (error) {
    console.log(error, 'sequelize: Kết nối đến cơ sở dữ liệu MySQL bằng Sequelize khó tạo!');         
}

// Export the sequelize instance for use in other modules

  //database first dùngg sequelize-auto
  //sequelize-auto -h localhost -d db_cyber_community -u root -x 123456 -p 3307  --dialect mysql -o ./models -l esm -a ./additional.json

 

export default sequelize;