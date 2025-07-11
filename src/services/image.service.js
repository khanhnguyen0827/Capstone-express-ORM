import prisma from '../common/prisma/init.prisma.js';
import { BadrequestException } from '../common/helpers/exception.helper.js';

const imageService = {
  getAllImages: async () => {
    return await prisma.images.findMany();
  },

  searchImages: async (name) => {
    return await prisma.images.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  },

  getImageDetail: async (image_id) => {
    const image = await prisma.images.findUnique({
      where: { id: Number(image_id) },
      include: {
        creator: true, // assuming relation field name is creator
      },
    });
    if (!image) {
      throw new BadrequestException('Image not found');
    }
    return image;
  },

  getImageComments: async (image_id) => {
    return await prisma.comments.findMany({
      where: { imageId: Number(image_id) },
      orderBy: { createdAt: 'desc' },
    });
  },

  checkImageSaved: async (user, image_id) => {
    if (!user) {
      throw new BadrequestException('User not authenticated');
    }
    const saved = await prisma.savedImages.findFirst({
      where: {
        userId: user.id,
        imageId: Number(image_id),
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
        userId: user.id,
        imageId: Number(image_id),
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
      where: { id: Number(image_id) },
    });
    if (!image) {
      throw new BadrequestException('Image not found');
    }
    if (image.creatorId !== user.id) {
      throw new BadrequestException('Not authorized to delete this image');
    }
    await prisma.images.delete({
      where: { id: Number(image_id) },
    });
  },
};

export default imageService;
