import prisma from "../common/prisma/init.prisma";
import { BadrequestException } from "../common/helpers/exception.helper";

const imageService = {
  getImages: async (req) => {
    let { page, pageSize, search } = req.query;
    page = +page > 0 ? +page : 1;
    pageSize = +pageSize > 0 ? +pageSize : 10;
    search = search ? search.trim() : "";

    const where = search
      ? {
          image_name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    const skip = (page - 1) * pageSize;

    const images = await prisma.images.findMany({
      where,
      take: pageSize,
      skip,
      orderBy: {
        created_at: "desc",
      },
      include: {
        Users: true,
      },
    });

    const totalItem = await prisma.images.count({ where });
    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page,
      pageSize,
      totalItem,
      totalPage,
      items: images,
    };
  },

  getImageById: async (req) => {
    const id = Number(req.params.id);
    if (!id) throw new BadrequestException("ID ảnh không hợp lệ");

    const image = await prisma.images.findUnique({
      where: { image_id: id },
      include: {
        Users: true,
      },
    });

    if (!image) throw new BadrequestException("Không tìm thấy ảnh");

    return image;
  },

  getCommentsByImageId: async (req) => {
    const imageId = Number(req.params.id);
    if (!imageId) throw new BadrequestException("ID ảnh không hợp lệ");

    const comments = await prisma.comments.findMany({
      where: { image_id: imageId },
      orderBy: { commented_at: "desc" },
      include: {
        Users: true,
      },
    });

    return comments;
  },

  checkSavedImage: async (req) => {
    const imageId = Number(req.params.id);
    const userId = req.user?.id;
    if (!imageId || !userId) throw new BadrequestException("Thiếu thông tin kiểm tra");

    const saved = await prisma.saved_images.findUnique({
      where: {
        user_id_image_id: {
          user_id: userId,
          image_id: imageId,
        },
      },
    });

    return { saved: !!saved };
  },

  postComment: async (req) => {
    const imageId = Number(req.params.id);
    const userId = req.user?.id;
    const { content } = req.body;

    if (!imageId || !userId) throw new BadrequestException("Thiếu thông tin bình luận");
    if (!content || content.trim() === "") throw new BadrequestException("Nội dung bình luận không được để trống");

    const comment = await prisma.comments.create({
      data: {
        image_id: imageId,
        user_id: userId,
        content: content.trim(),
      },
    });

    return comment;
  },

  deleteImage: async (req) => {
    const imageId = Number(req.params.id);
    const userId = req.user?.id;
    if (!imageId || !userId) throw new BadrequestException("Thiếu thông tin xóa ảnh");

    // Kiểm tra ảnh có thuộc user không
    const image = await prisma.images.findUnique({
      where: { image_id: imageId },
    });

    if (!image) throw new BadrequestException("Ảnh không tồn tại");
    if (image.user_id !== userId) throw new BadrequestException("Bạn không có quyền xóa ảnh này");

    await prisma.images.delete({
      where: { image_id: imageId },
    });

    return { message: "Xóa ảnh thành công" };
  },
};

export default imageService;
