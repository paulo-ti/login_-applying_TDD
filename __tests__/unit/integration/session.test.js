const request = require("supertest");
const app = require("../../../src/app");
const { User } = require("../../../src/app/models/User");
const truncate = require("../../utils/truncate");

describe("Authentication", () => {
  beforeEach( async () =>{
    await truncate();
  })
  it("should authenticate with valid credentials", async () => {
    const user = {
      name: "Diego",
      email: "paulo-ti@hotmail.com",
      password_hash: "123456",
    };

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.status).toBe(200);
  });

  it("should not authenticate with invalid credentials", async () => {
    const user = {
      name: "Diego",
      email: "paulo-ti@hotmail.com",
      password_hash: "123456",
    };

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123458",
    });

    expect(response.status).toBe(401);
  });

  it("should return JWT token when authenticated", async() => {
    const user = {
      name: "Diego",
      email: "paulo-ti@hotmail.com",
      password_hash: "123456",
    };

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.body).toHaveProperty("token");
  })
});
