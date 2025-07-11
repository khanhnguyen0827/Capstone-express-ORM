const imageSwagger = {
  "/images": {
    get: {
      tags: ["Image"],
      summary: "Lấy danh sách ảnh",
      parameters: [
        {
          name: "page",
          in: "query",
          description: "Số trang",
          required: false,
          schema: { type: "integer", default: 1 },
        },
        {
          name: "pageSize",
          in: "query",
          description: "Số lượng ảnh trên trang",
          required: false,
          schema: { type: "integer", default: 10 },
        },
        {
          name: "search",
          in: "query",
          description: "Từ khóa tìm kiếm",
          required: false,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: {
          description: "Danh sách ảnh trả về thành công",
        },
      },
    },
  },
  "/images/{id}": {
    get: {
      tags: ["Image"],
      summary: "Lấy ảnh theo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID của ảnh",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Ảnh trả về thành công",
        },
        400: {
          description: "ID không hợp lệ hoặc ảnh không tồn tại",
        },
      },
    },
    delete: {
      tags: ["Image"],
      summary: "Xóa ảnh theo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID của ảnh cần xóa",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Xóa ảnh thành công",
        },
        400: {
          description: "Lỗi khi xóa ảnh",
        },
      },
      security: [
        {
          ANH_LONG_BearerAuth: [],
        },
      ],
    },
  },
  "/images/{id}/comments": {
    get: {
      tags: ["Image"],
      summary: "Lấy bình luận theo ID ảnh",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID của ảnh",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Danh sách bình luận trả về thành công",
        },
        400: {
          description: "ID không hợp lệ hoặc không tìm thấy bình luận",
        },
      },
    },
    post: {
      tags: ["Image"],
      summary: "Thêm bình luận cho ảnh",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID của ảnh",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: { type: "string", example: "Bình luận test" },
              },
              required: ["content"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Thêm bình luận thành công",
        },
        400: {
          description: "Lỗi khi thêm bình luận",
        },
      },
      security: [
        {
          ANH_LONG_BearerAuth: [],
        },
      ],
    },
  },
  "/images/{id}/check-saved": {
    get: {
      tags: ["Image"],
      summary: "Kiểm tra ảnh đã lưu",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID của ảnh",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Trả về trạng thái đã lưu",
        },
        400: {
          description: "Lỗi khi kiểm tra trạng thái lưu",
        },
      },
      security: [
        {
          ANH_LONG_BearerAuth: [],
        },
      ],
    },
  },
};

export default imageSwagger;
