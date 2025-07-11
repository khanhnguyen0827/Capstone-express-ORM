
import articlesService from '../services/articles.service.js';
import { responseSeccess } from '../common/helpers/response.helper.js';
// articles.controller.js


const articlesController = {
    getAllArticles: async (req, res, next) => {
        try {
            const articles = await articlesService.getAll(req);
            const resdata = responseSeccess(articles, "Get all articles successfully");
            res.status(resdata.statusCode).json(resdata);        
/**
 * phân trang (pagination)
 * trả về dữ liệu dưới dạng JSON pagination
 * pagaSize , limit // so luong ban ghi moi trang
 * page, offset   // trang hien tai, offset là vi tri bat dau lay du lieu
 * totalPage, totalRecords // tong so trang, tong so ban ghi    
 * công thức phân trang 
 * const offset = (page - 1) * pagaSize;
 * 
 * thong tin phan trang trên trang web
 * res.status(resdata.statusCode).json(resdata);
 */
        } catch (error) {
            console.error("Error fetching articles:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};


export default articlesController;
// articlesController là một đối tượng chứa các phương thức để xử lý các yêu cầu liên quan đến bài viết

