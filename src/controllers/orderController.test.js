const request = require("supertest");
const express = require("express");
const orderController = require("./orderController");
const orderService = require("../services/orderService");
const { errorHandler } = require("../middlewares/errorHandler");

jest.mock("../services/orderService");

const app = express();
app.use(express.json());
app.post("/orders", orderController.createOrder);
app.use(errorHandler); // Use the error handler middleware

describe("Order Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an order successfully", async () => {
    orderService.publishOrder.mockResolvedValue();

    const response = await request(app).post("/orders").send({
      productId: "123",
      quantity: 5,
      customerEmail: "customer@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Order created successfully");
  });

  it("should return 400 if productId is missing", async () => {
    const response = await request(app).post("/orders").send({
      quantity: 5,
      customerEmail: "customer@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain("Product ID is required.");
  });

  it("should return 400 if quantity is missing or less than or equal to zero", async () => {
    const response1 = await request(app).post("/orders").send({
      productId: "123",
      customerEmail: "customer@example.com",
    });

    const response2 = await request(app).post("/orders").send({
      productId: "123",
      quantity: 0,
      customerEmail: "customer@example.com",
    });

    expect(response1.status).toBe(400);
    expect(response1.body.errors).toContain(
      "Quantity must be greater than zero."
    );
    expect(response2.status).toBe(400);
    expect(response2.body.errors).toContain(
      "Quantity must be greater than zero."
    );
  });

  it("should return 400 if customerEmail is missing or invalid", async () => {
    const response1 = await request(app).post("/orders").send({
      productId: "123",
      quantity: 5,
    });

    const response2 = await request(app).post("/orders").send({
      productId: "123",
      quantity: 5,
      customerEmail: "invalid-email",
    });

    expect(response1.status).toBe(400);
    expect(response1.body.errors).toContain(
      "A valid customer email is required."
    );
    expect(response2.status).toBe(400);
    expect(response2.body.errors).toContain(
      "A valid customer email is required."
    );
  });

  it("should handle service errors gracefully", async () => {
    orderService.publishOrder.mockRejectedValue(new Error("Service error"));

    const response = await request(app).post("/orders").send({
      productId: "123",
      quantity: 5,
      customerEmail: "customer@example.com",
    });

    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe("Failed to create order");
  });
});
