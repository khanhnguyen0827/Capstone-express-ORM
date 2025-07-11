import request from "supertest";
import app from "../server"; // giả sử server.js export app express

describe("Auth API", () => {
  describe("POST /auth/login", () => {
    it("should return 400 if email or password is missing", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "test@example.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Email và mật khẩu không được để trống");
    });

    it("should fail login with wrong password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "existing@example.com", password: "wrongpassword" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Mật khẩu không chính xác");
    });

    it("should fail login with missing fields", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "existing@example.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Email và mật khẩu không được để trống");
    });

    it("should return 400 if user does not exist", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "nonexistent@example.com", password: "1234" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Người dùng chưa tồn tại xin vui lòng đăng ký");
    });

    it("should login successfully with valid credentials", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "existing@example.com", password: "password123" });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.statusCode).toBe(200);
      expect(res.body.message).toBe("OK");
      expect(res.body.data).toHaveProperty("user");
      expect(res.body.data).toHaveProperty("tokens");
      expect(res.body.data.user).toHaveProperty("id");
      expect(res.body.data.user).toHaveProperty("email");
      expect(res.body.data.user).toHaveProperty("fullName");
      expect(res.body.data.tokens).toHaveProperty("accessToken");
      expect(res.body.data.tokens).toHaveProperty("refreshToken");
    });
  });

  // Nếu có endpoint register, thêm test tương tự
});
