
import e from "cors";
import prisma from "../common/prisma/init.prisma.js";
// Import Prisma client to interact with the database

const articlesService = {
    getAll:  async(req) => {
        // This method retrieves all articles from the database
        /**
 * phân trang (pagination)
 * trả về dữ liệu dưới dạng JSON pagination
 * pagaSize , limit // so luong ban ghi moi trang
 * page, offset   // trang hien tai, offset là vi tri bat dau lay du lieu
 * totalPage, totalRecords // tong so trang, tong so ban ghi    
 * công thức phân trang 
 * const offset = (page - 1) * pagaSize;
 */
        let { page , pageSize, filters } = req.query;    
        page = +page>0 ? +page : 1; // default page = 1
        pageSize = +pageSize>0 ? +pageSize : 3; // default pageSize = 3
        filters = filters ? JSON.parse(filters) : {}; // Parse filters if provided
        // Ensure page and pageSize are numbers
        console.log(page,pageSize, filters);
    
        const offset = (page - 1) * pageSize;

       

        // filter condition

        console.log(Object.entries(filters));
         //[ [ 'views', 8 ], [ 'content', 'sql' ] ]
        // Example filter condition: fromat: { key: 'value' }
        Object.entries(filters).forEach(([key, value], index, array) => {
            // Destructure the key and value from the array

            if (value === "" || value === null || value === undefined) {
                delete filters[key]; // If the value is empty, null, or undefined, remove this key from the filters object
                // If the value is empty, null, or undefined, skip this filter
                return;
                // If the key is 'views' and the value is a number, add it to the filter1s object
        
            } 
            if (typeof value === 'string') {
                // If the value is truthy, add it to the filter1s object
                filters[key] = {
                    contains: value, // Use 'contains' for string matching
                };
            }
            
        });
        console.log('\n bắt đầu XỬ LÝ ');
        console.log(filters);

        const where = {
            // Define the where condition for filtering articles        
            ...filters,     };
        


        const listArticles = await prisma.articles.findMany({
            orderBy: { // Sort the articles by createdAt in descending order
                createdAt: 'asc',
            },
            skip: offset,
            take: pageSize,
            where:where, // Apply the filter condition
            
        });

        const totalItems = await prisma.articles.count({ where: where, }); // Count the total number of articles that match the filter conditiongth; // Get the total number of articles

        return {
            page: page, //số trang hien tai
            pageSize: pageSize, //số bản ghi trong 1 trang
            totalitems: totalItems,  //tong so bản ghi
            totalPage: Math.ceil(totalItems / pageSize), //tong so trang
            items: listArticles, //danh sách bản ghi
        } ;
    }
    
};


export default articlesService;
// articlesService là một đối tượng chứa các phương thức để tương tác với dữ liệu bài viết
