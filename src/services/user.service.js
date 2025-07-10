import { BadrequestException, UnauthorizedException } from "../common/helpers/exception.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcryptjs";

const userService = {
   // Lấy thông tin user theo ID
   getUserById: async (req) => {
      const { id } = req.params;

      const user = await prisma.users.findUnique({
         where: {
            user_id: parseInt(id)
         },
         select: {
            user_id: true,
            username: true,
            email: true,
            full_name: true,
            created_at: true,
            _count: {
               select: {
                  Images: true,
                  Comments: true,
                  SavedImages: true
               }
            }
         }
      });

      if (!user) {
         throw new BadrequestException("Không tìm thấy người dùng");
      }

      return user;
   },

   // Lấy danh sách ảnh đã lưu theo user ID
   getSavedImages: async (req) => {
      const { id } = req.params;
      const { page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;

      // Kiểm tra user có tồn tại không
      const userExists = await prisma.users.findUnique({
         where: { user_id: parseInt(id) }
      });

      if (!userExists) {
         throw new BadrequestException("Không tìm thấy người dùng");
      }

      const savedImages = await prisma.savedImages.findMany({
         where: {
            user_id: parseInt(id)
         },
         skip: parseInt(skip),
         take: parseInt(limit),
         include: {
            Images: {
               include: {
                  Users: {
                     select: {
                        user_id: true,
                        username: true,
                        full_name: true
                     }
                  },
                  _count: {
                     select: {
                        Comments: true,
                        SavedImages: true
                     }
                  }
               }
            }
         },
         orderBy: {
            saved_at: 'desc'
         }
      });

      const total = await prisma.savedImages.count({
         where: {
            user_id: parseInt(id)
         }
      });

      return {
         savedImages: savedImages.map(item => ({
            ...item.Images,
            saved_at: item.saved_at
         })),
         pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / limit)
         }
      };
   },

   // Lấy danh sách ảnh đã tạo theo user ID
   getCreatedImages: async (req) => {
      const { id } = req.params;
      const { page = 1, limit = 20 } = req.query;
      const skip = (page - 1) * limit;

      // Kiểm tra user có tồn tại không
      const userExists = await prisma.users.findUnique({
         where: { user_id: parseInt(id) }
      });

      if (!userExists) {
         throw new BadrequestException("Không tìm thấy người dùng");
      }

      const createdImages = await prisma.images.findMany({
         where: {
            user_id: parseInt(id)
         },
         skip: parseInt(skip),
         take: parseInt(limit),
         include: {
            Users: {
               select: {
                  user_id: true,
                  username: true,
                  full_name: true
               }
            },
            _count: {
               select: {
                  Comments: true,
                  SavedImages: true
               }
            }
         },
         orderBy: {
            created_at: 'desc'
         }
      });

      const total = await prisma.images.count({
         where: {
            user_id: parseInt(id)
         }
      });

      return {
         createdImages,
         pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / limit)
         }
      };
   },

   // Lấy thống kê của user
   getUserStats: async (req) => {
      const { id } = req.params;

      // Kiểm tra user có tồn tại không
      const userExists = await prisma.users.findUnique({
         where: { user_id: parseInt(id) }
      });

      if (!userExists) {
         throw new BadrequestException("Không tìm thấy người dùng");
      }

      // Đếm số ảnh đã tạo
      const totalCreatedImages = await prisma.images.count({
         where: { user_id: parseInt(id) }
      });

      // Đếm số ảnh đã lưu
      const totalSavedImages = await prisma.savedImages.count({
         where: { user_id: parseInt(id) }
      });

      // Đếm số bình luận đã viết
      const totalComments = await prisma.comments.count({
         where: { user_id: parseInt(id) }
      });

      // Đếm tổng số lượt lưu ảnh của user (ảnh của user được lưu bao nhiêu lần)
      const totalSavesReceived = await prisma.savedImages.count({
         where: {
            Images: {
               user_id: parseInt(id)
            }
         }
      });

      // Đếm tổng số bình luận nhận được trên ảnh của user
      const totalCommentsReceived = await prisma.comments.count({
         where: {
            Images: {
               user_id: parseInt(id)
            }
         }
      });

      return {
         user_id: parseInt(id),
         stats: {
            totalCreatedImages,
            totalSavedImages,
            totalComments,
            totalSavesReceived,
            totalCommentsReceived
         }
      };
   },

   // Cập nhật thông tin profile
   updateProfile: async (req) => {
      const { id } = req.params;
      const { username, full_name, email, current_password, new_password } = req.body;
      const currentUserId = req.user.user_id;

      // Kiểm tra quyền cập nhật (chỉ được cập nhật profile của chính mình)
      if (parseInt(id) !== currentUserId) {
         throw new UnauthorizedException("Bạn không có quyền cập nhật profile này");
      }

      const user = await prisma.users.findUnique({
         where: { user_id: parseInt(id) }
      });

      if (!user) {
         throw new BadrequestException("Không tìm thấy người dùng");
      }

      const updateData = {};

      // Cập nhật username nếu có
      if (username && username.trim() !== '') {
         // Kiểm tra username đã tồn tại chưa
         const existingUser = await prisma.users.findFirst({
            where: {
               username: username.trim(),
               user_id: {
                  not: parseInt(id)
               }
            }
         });

         if (existingUser) {
            throw new BadrequestException("Username đã tồn tại");
         }

         updateData.username = username.trim();
      }

      // Cập nhật full_name nếu có
      if (full_name !== undefined) {
         updateData.full_name = full_name?.trim() || null;
      }

      // Cập nhật email nếu có
      if (email && email.trim() !== '') {
         // Kiểm tra email đã tồn tại chưa
         const existingUser = await prisma.users.findFirst({
            where: {
               email: email.trim(),
               user_id: {
                  not: parseInt(id)
               }
            }
         });

         if (existingUser) {
            throw new BadrequestException("Email đã tồn tại");
         }

         updateData.email = email.trim();
      }

      // Cập nhật mật khẩu nếu có
      if (new_password && new_password.trim() !== '') {
         if (!current_password) {
            throw new BadrequestException("Vui lòng nhập mật khẩu hiện tại");
         }

         // Kiểm tra mật khẩu hiện tại
         const isCurrentPasswordValid = bcrypt.compareSync(current_password, user.password_hash);
         if (!isCurrentPasswordValid) {
            throw new BadrequestException("Mật khẩu hiện tại không chính xác");
         }

         // Hash mật khẩu mới
         updateData.password_hash = bcrypt.hashSync(new_password.trim(), 10);
      }

      // Cập nhật thông tin
      const updatedUser = await prisma.users.update({
         where: { user_id: parseInt(id) },
         data: updateData,
         select: {
            user_id: true,
            username: true,
            email: true,
            full_name: true,
            created_at: true
         }
      });

      return updatedUser;
   }
};

export default userService;
