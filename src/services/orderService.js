const amqp = require("amqplib");
const config = require("../config/config");
const logger = require("../utils/logger"); // Import the logger

exports.publishOrder = async (orderData) => {
  try {
    // Establish connection to RabbitMQ
    const connection = await amqp.connect(config.rabbitmq.url);
    const channel = await connection.createChannel();

    // Ensure the exchange exists
    await channel.assertExchange(config.rabbitmq.exchangeName, "fanout", {
      durable: true,
    });

    // Publish the order message to the exchange
    channel.publish(
      config.rabbitmq.exchangeName,
      "",
      Buffer.from(JSON.stringify(orderData))
    );

    logger.info("Order published to RabbitMQ:", orderData); // Use logger

    // Close the channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    throw new Error("RabbitMQ publish error");
  }
};
