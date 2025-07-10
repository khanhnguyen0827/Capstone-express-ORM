import prisma from '../common/prisma/init.prisma.js';


const roleService = {
   create: async function (req) {
      return `This action create`;
   },

    findAll:  async(req) => {
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
      
    
        const offset = (page - 1) * pageSize;

        // filter condition
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
            if (key === 'id' && typeof value === 'string'   ) {
                // If the key is 'views' and the value is a string, add it to the filter1s object
                filters[key] = +value;
                return;
            }
            if(!isNaN(new Date(value))){
                const startDate = new Date(value);
                const endDate = new Date(value);// Create a new Date object for the end date 14/6/2025
                endDate.setDate(endDate.getDate() + 1);// Add 1 day to the end date lấy 14+1=15/6/2025
                filters[key] = {
                    gte: startDate,
                    lt: endDate,
                };  
                return;
            }   

            if (typeof value === 'string') {
                // If the value is truthy, add it to the filter1s object
                filters[key] = {
                    contains: value, // Use 'contains' for string matching
                };
            }
            
        });


        const where = {
            // Define the where condition for filtering articles        
            ...filters,     };
        


        const listRoles = await prisma.roles.findMany({
            orderBy: { // Sort the articles by createdAt in descending order
                createdAt: 'asc',
            },
            skip: offset,
            take: pageSize,
            where:where, // Apply the filter condition
            
        });

        const totalItems = await prisma.roles.count({ where: where, }); // Count the total number of articles that match the filter conditiongth; // Get the total number of articles

        return {
            page: page, //số trang hien tai
            pageSize: pageSize, //số bản ghi trong 1 trang
            totalitems: totalItems,  //tong so bản ghi
            totalPage: Math.ceil(totalItems / pageSize), //tong so trang
            items: listRoles, //danh sách bản ghi
        } ;
    },

   findOne: async function (req) {
    const roleID = +req.params.id;
    const role = await prisma.roles.findUnique({where:{id:+roleID}});
    return role;
   },

   update: async function (req) {
      return `This action updates a id: ${req.params.id} role`;
   },

   remove: async function (req) {
      return `This action removes a id: ${req.params.id} role`;
   },

   togglePermission: async function (req) {
     const { roleId, permissionId } = req.body;

     const rolePermissionExist = await prisma.rolePermission.findFirst({where:{roleId:roleId, permissionId:permissionId}});

     if (rolePermissionExist) {
        await prisma.rolePermission.update({where:{id:rolePermissionExist.id}, data:{isActive:!rolePermissionExist.isActive}}); 
     } else {
        await prisma.rolePermission.create({data:{roleId:roleId, permissionId:permissionId, isActive:true}});
     }
      return true;
   },
};

export default roleService;