import prisma from '../common/prisma/init.prisma.js';
import { BadrequestException } from '../common/helpers/exception.helper.js';

const imageService = {
  getAllImages: async () => {
    return await prisma.images.findMany();
  },

  searchImages: async (name) => {
    return await prisma.images.findMany({
      where: {
        image_name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  },

  getImageDetail: async (image_id) => {
    const image = await prisma.images.findUnique({
      where: { image_id: Number(image_id) },
      include: {
        users: true,
      },
    });
    if (!image) {
      throw new BadrequestException('Image not found');
    }
    return image;
  },

  getImageComments: async (image_id) => {
    return await prisma.comments.findMany({
      where: { image_id: Number(image_id) },
      orderBy: { commented_at: 'desc' },
    });
  },

  checkImageSaved: async (user, image_id) => {
    if (!user) {
      throw new BadrequestException('User not authenticated');
    }
    const saved = await prisma.saved_images.findFirst({
      where: {
        user_id: user.user_id,
        image_id: Number(image_id),
      },
    });
    return !!saved;
  },

  postImageComment: async (user, image_id, commentData) => {
    if (!user) {
      throw new BadrequestException('User not authenticated');
    }
    const newComment = await prisma.comments.create({
      data: {
        user_id: user.user_id,
        image_id: Number(image_id),
        content: commentData.content,
      },
    });
    return newComment;
  },

  deleteImage: async (user, image_id) => {
    if (!user) {
      throw new BadrequestException('User not authenticated');
    }
    const image = await prisma.images.findUnique({
      where: { image_id: Number(image_id) },
    });
    if (!image) {
      throw new BadrequestException('Image not found');
    }
    if (image.user_id !== user.user_id) {
      throw new BadrequestException('Not authorized to delete this image');
    }
    await prisma.images.delete({
      where: { image_id: Number(image_id) },
    });
  },
};

export default imageService;
