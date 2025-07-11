const request = require("supertest");
const app = require("../server"); // giả sử server.js export app express

describe("Image API", () => {
  describe("GET /images", () => {
    it("should get images list successfully", async () => {
      const res = await request(app)
        .get("/images")
        .query({ page: 1, pageSize: 5, search: "flower" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("items");
    });
  });

  describe("GET /images/:id", () => {
    it("should get image by id successfully", async () => {
      const res = await request(app).get("/images/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("image_id");
    });

    it("should return 400 for invalid id", async () => {
      const res = await request(app).get("/images/999999");
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /images/:id/comments", () => {
    it("should add comment successfully", async () => {
      const res = await request(app)
        .post("/images/1/comments")
        .send({ content: "Test comment" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("content", "Test comment");
    });

    it("should fail to add comment with empty content", async () => {
      const res = await request(app)
        .post("/images/1/comments")
        .send({ content: "" });
      expect(res.statusCode).toBe(400);
    });
  });

  describe("DELETE /images/:id", () => {
    it("should delete image successfully", async () => {
      // Cần token hoặc user hợp lệ, giả sử có token
      const token = "Bearer your_valid_jwt_token";
      const res = await request(app)
        .delete("/images/1")
        .set("Authorization", token);
      expect(res.statusCode).toBe(200);
    });

    it("should fail to delete image without auth", async () => {
      const res = await request(app).delete("/images/1");
      expect(res.statusCode).toBe(401);
    });
  });
});
