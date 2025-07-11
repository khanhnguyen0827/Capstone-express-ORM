import { Sequelize } from 'sequelize';
import pool from '../common/mysql2/init.mysql.js';
import Roles from '../common/sequelize/model.sequelize.js';

import initModels from '../models/init-models.js';
// Import Sequelize for ORM support
import sequelize from '../common/sequelize/init.sequelize.js';

import {BadrequestException} from '../common/helpers/exception.helper.js';

const demoService = {

    HelloWorld: (req, res) => {
        const message = "Hello, World!";
    return message;},

    query: (req, res) => {
    const query = req.query;
    return  query;},

    params: (req, res) => {
    const params = req.params;
    return params;},

    headers: (req, res) => {
    const headers = req.headers;
    return headers;},

    body: (req, res) => {
    const body = req.body;
    console.log(body);
    return body;     
    },

    mysql2: async() => {

            //console.log(abc);
            //lỗi app crashed - waiting for file changes before starting...: rới sever
            //const a =6

         const [ rows, fields] = await pool.query('SELECT * FROM `Roles`');
    // Trả về dữ liệu dưới dạng JSON
    //rows là mảng các đối tượng, mỗi đối tượng là một hàng dữ liệu trong bảng Roles
    //fields là mảng các trường dữ liệu trong bảng Roles

     // Trả về dữ liệu dưới dạng JSON, nếu không có dữ liệu thì trả về mảng rỗng
    // res.json(fields || []); // Trả về dữ liệu dưới dạng JSON, nếu không có dữ liệu thì trả về mảng rỗng
        return rows;
    },

  
    sequelize: async () => {

        //lỗi kiểm soát đc
   
        //console.log(abc);


        //lỗi ko kiểm soát đc
        // const a =6
       
        // const b = 5;

        // if (a !== b) {
           
        //     throw new BadrequestException("lỗi kiểm soát");// trả lỗi
        // //throw new Error("lỗi không kiểm soát"); // trả lỗi
        // }


        const models = initModels(sequelize);
        // Lấy dữ liệu từ bảng Roles bằng Sequelize
        const listRoles1 = await Roles.findAll();
        // Sử dụng Sequelize để thực hiện truy vấn
        const listRoles2 = await models.Roles.findAll();
        // Lấy dữ liệu từ bảng Roles bằng Sequelize-auto
        // Sử dụng Sequelize để thực hiện truy vấn
        const result = {
      "model tự tạo sử dụng sequelize": listRoles1, 
      "model tự tạo sử dụng sequelize-auto": listRoles2,
    }
        return result;
    }   


};
export default demoService


