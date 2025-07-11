import request from "supertest";
import app from "../server"; // giả sử server.js export app express

describe("Auth API", () => {
  describe("POST /auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "existing@example.com", password: "password123" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
    });

    it("should fail login with wrong password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "existing@example.com", password: "wrongpassword" });
      expect(res.statusCode).toBe(400);
    });

    it("should fail login with missing fields", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "existing@example.com" });
      expect(res.statusCode).toBe(400);
    });
  });

  // Nếu có endpoint register, thêm test tương tự
});
