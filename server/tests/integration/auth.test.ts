import app from "@/app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const request = supertest(app);

describe("POST /users/sign-up", () => {
  describe("when body is valid", () => {
    const password = faker.internet.password();

    const validBody = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: password,
      confirmPassword: password,
    };

    it("should return wtih status 201", async () => {
      const response = await request.post("/user/sign-up").send(validBody);

      expect(response.status).toBe(201);
    });

    it("should return 409 when email is already in use", async () => {
      const response = await request
        .post("/user/sign-up")
        .send({ ...validBody, username: faker.internet.email() });

      expect(response.status).toBe(409);
    });

    it("should return 409 when username is already in use", async () => {
      const response = await request
        .post("/user/sign-up")
        .send({ ...validBody, email: faker.internet.email() });

      expect(response.status).toBe(409);
    });
  });

  describe("when body is invalid", () => {
    it("should return 400 when email is invalid", async () => {
      const response = await request.post("/user/sign-up").send({
        email: "invalidEmail",
        username: faker.internet.userName(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 when username is invalid", async () => {
      const response = await request.post("/user/sign-up").send({
        email: faker.internet.email(),
        username: "invalidUsername",
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 when password is invalid", async () => {
      const response = await request.post("/user/sign-up").send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: "invalidPassword",
        confirmPassword: "invalidPassword",
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 when password and confirmPassword don't match", async () => {
      const response = await request.post("/user/sign-up").send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
      });

      expect(response.status).toBe(400);
    });
  });
});
