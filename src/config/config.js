require("dotenv").config({ quiet: true });

const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://localhost",
    exchangeName: process.env.EXCHANGE_NAME || "orders",
  },
};

module.exports = config;
