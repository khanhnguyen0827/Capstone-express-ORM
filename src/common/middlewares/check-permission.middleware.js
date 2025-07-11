import { BadrequestException } from "../helpers/exception.helper";
import prisma from "../prisma/init.prisma.js";


const checkPermission = async ( req, res ,next) => {
    // Middleware kiểm tra quyền truy cập của người dùng
    // Có thể kiểm tra quyền truy cập dựa trên vai trò hoặc quyền của người dùng
    req.ischeckpermission = true; // Đặt một thuộc tính để xác định rằng middleware đã được thực thi
    
    // Thực hiện kiểm tra quyền truy cập ở đây
    // Ví dụ: nếu người dùng có quyền truy cập, tiếp tục
    // Nếu không, có thể ném một lỗi hoặc trả về phản hồi lỗi
    // res.status(403).json({ message: "Forbidden" }); // Nếu không có quyền truy cập
    
    const user = req.user;
    console.log(user);
    if(user.roleId === 1){
      next();
      return;
    }

    const method = req.method;
    const endpoint  = req.baseUrl+req.route?.path;
    

  const rolePermissionExist = await prisma.rolePermission.findFirst({
      where: {
        roleId: user.roleId,
        Permissions: {
          method: method,
          endpoint: endpoint
        },
        isActive: true,
        Roles: {
          isActive: true  
        }

        
      }
    })

    if(!rolePermissionExist) throw new BadrequestException("Không có quyền truy cập"); // Nếu không có quyền truy cập
    
next();
  // Middleware to check user permissions
}

export default checkPermission;