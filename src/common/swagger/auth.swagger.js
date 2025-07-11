const authSwagger = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Đăng ký người dùng mới",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "example@gmail.com" },
                password: { type: "string", example: "1234" },
                fullName: { type: "string", example: "Nguyen Van A" }
              },
              required: ["email", "password", "fullName"]
            }
          }
        }
      },
      responses: {
        201: {
          description: "Đăng ký thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  statusCode: { type: "integer", example: 201 },
                  message: { type: "string", example: "User registered successfully" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "user-id" },
                      email: { type: "string", example: "example@gmail.com" },
                      fullName: { type: "string", example: "Nguyen Van A" }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Dữ liệu đầu vào không hợp lệ hoặc tài khoản đã tồn tại"
        }
      }
    }
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Đăng nhập người dùng",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "example@gmail.com" },
                password: { type: "string", example: "1234" }
              },
              required: ["email", "password"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Đăng nhập thành công, trả về token và thông tin người dùng",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  statusCode: { type: "integer", example: 200 },
                  message: { type: "string", example: "OK" },
                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "string", example: "user-id" },
                          email: { type: "string", example: "example@gmail.com" },
                          fullName: { type: "string", example: "Nguyen Van A" }
                        }
                      },
                      tokens: {
                        type: "object",
                        properties: {
                          accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                          refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
                        }
                      }
                    }
                  },
                  doc: { type: "string", example: "domain.com/swagger" }
                }
              }
            }
          }
        },
        400: {
          description: "Dữ liệu đầu vào không hợp lệ hoặc đăng nhập thất bại"
        },
        401: {
          description: "Không được phép, thông tin đăng nhập không chính xác"
        }
      }
    }
  },
  "/auth/get-info": {
    get: {
      tags: ["Auth"],
      summary: "Lấy thông tin người dùng hiện tại",
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: "Lấy thông tin thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  statusCode: { type: "integer", example: 200 },
                  message: { type: "string", example: "OK" },
                  data: {
                    type: "object",
                    properties: {
                      id: { type: "string", example: "user-id" },
                      email: { type: "string", example: "example@gmail.com" },
                      fullName: { type: "string", example: "Nguyen Van A" }
                    }
                  }
                }
              }
            }
          }
        },
        401: {
          description: "Không được phép, token không hợp lệ hoặc hết hạn"
        }
      }
    }
  },
  "/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Làm mới token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: { type: "string", example: "refresh-token" }
              },
              required: ["refreshToken"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Làm mới token thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  statusCode: { type: "integer", example: 200 },
                  message: { type: "string", example: "OK" },
                  data: {
                    type: "object",
                    properties: {
                      accessToken: { type: "string", example: "new-access-token" },
                      refreshToken: { type: "string", example: "new-refresh-token" }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Dữ liệu đầu vào không hợp lệ"
        },
        401: {
          description: "Không được phép, refresh token không hợp lệ hoặc hết hạn"
        }
      }
    }
  },
  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Đăng xuất",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                refreshToken: { type: "string", example: "refresh-token" }
              },
              required: ["refreshToken"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Đăng xuất thành công",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  statusCode: { type: "integer", example: 200 },
                  message: { type: "string", example: "OK" },
                  data: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Đăng xuất thành công" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default authSwagger;
