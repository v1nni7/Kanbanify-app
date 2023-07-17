"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("@/app"));
const supertest_1 = __importDefault(require("supertest"));
const faker_1 = require("@faker-js/faker");
const request = (0, supertest_1.default)(app_1.default);
describe("POST /users/sign-up", () => {
    describe("when body is valid", () => {
        const password = faker_1.faker.internet.password();
        const validBody = {
            email: faker_1.faker.internet.email(),
            username: faker_1.faker.internet.userName(),
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
                .send(Object.assign(Object.assign({}, validBody), { username: faker_1.faker.internet.email() }));
            expect(response.status).toBe(409);
        });
        it("should return 409 when username is already in use", async () => {
            const response = await request
                .post("/user/sign-up")
                .send(Object.assign(Object.assign({}, validBody), { email: faker_1.faker.internet.email() }));
            expect(response.status).toBe(409);
        });
    });
    describe("when body is invalid", () => {
        it("should return 400 when email is invalid", async () => {
            const response = await request.post("/user/sign-up").send({
                email: "invalidEmail",
                username: faker_1.faker.internet.userName(),
                password: faker_1.faker.internet.password(),
                confirmPassword: faker_1.faker.internet.password(),
            });
            expect(response.status).toBe(400);
        });
        it("should return 400 when username is invalid", async () => {
            const response = await request.post("/user/sign-up").send({
                email: faker_1.faker.internet.email(),
                username: "invalidUsername",
                password: faker_1.faker.internet.password(),
                confirmPassword: faker_1.faker.internet.password(),
            });
            expect(response.status).toBe(400);
        });
        it("should return 400 when password is invalid", async () => {
            const response = await request.post("/user/sign-up").send({
                email: faker_1.faker.internet.email(),
                username: faker_1.faker.internet.userName(),
                password: "invalidPassword",
                confirmPassword: "invalidPassword",
            });
            expect(response.status).toBe(400);
        });
        it("should return 400 when password and confirmPassword don't match", async () => {
            const response = await request.post("/user/sign-up").send({
                email: faker_1.faker.internet.email(),
                username: faker_1.faker.internet.userName(),
                password: faker_1.faker.internet.password(),
                confirmPassword: faker_1.faker.internet.password(),
            });
            expect(response.status).toBe(400);
        });
    });
});
