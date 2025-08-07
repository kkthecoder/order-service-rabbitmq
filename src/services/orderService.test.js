const orderService = require("./orderService");
const amqp = require("amqplib");

jest.mock("amqplib");

describe("Order Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should publish order to RabbitMQ", async () => {
    const mockChannel = {
      assertExchange: jest.fn(),
      publish: jest.fn(),
      close: jest.fn(),
    };
    const mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
      close: jest.fn(),
    };

    amqp.connect.mockResolvedValue(mockConnection);

    const orderData = { id: 1, item: "Test Item" };
    await orderService.publishOrder(orderData);

    expect(mockChannel.assertExchange).toHaveBeenCalledWith(
      expect.any(String),
      "direct",
      { durable: true }
    );
    expect(mockChannel.publish).toHaveBeenCalledWith(
      expect.any(String),
      "",
      Buffer.from(JSON.stringify(orderData))
    );
    expect(mockChannel.close).toHaveBeenCalled();
    expect(mockConnection.close).toHaveBeenCalled();
  });

  it("should throw an error if RabbitMQ connection fails", async () => {
    amqp.connect.mockRejectedValue(new Error("Connection failed"));

    const orderData = { id: 1, item: "Test Item" };
    await expect(orderService.publishOrder(orderData)).rejects.toThrow(
      "RabbitMQ publish error"
    );
  });
});
