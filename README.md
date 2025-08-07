# Order Service

The Order Service is a microservice designed to handle order processing in a message-driven architecture. It integrates with RabbitMQ to publish order message, facilitating communication with other services like Inventory, Payment, Email, and Shipping. For learning purpose, only inventory service is implemented (inventory-service-rabbitmq). Node v24.2.0 and RabbitMQ 4.x is used.

Order validation is done through orderValidator.js. Error handling is implemented by using CustomerError class and middleware. Winston logger is used for logging in console and error.log file.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Configuration](#configuration)
- [Running the Service](#running-the-service)
- [Testing](#testing)
- [License](#license)

## Features

- Publishes order creation messages to RabbitMQ.
- Consumes messages from other services for order processing.
- Integrates with Inventory, Payment, Email, and Shipping services.
- Supports message broadcasting using a fanout exchange.

## Architecture

The service uses a message-driven architecture with RabbitMQ as the message broker. It employs a fanout exchange to broadcast order messages to multiple services, ensuring each service receives the necessary information for processing.

## Setup and Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/kkthecoder/order-service-rabbitmq.git
cd order-service-rabbitmq
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Install RabbitMQ:**

Follow the [official RabbitMQ installation guide](https://www.rabbitmq.com/download.html) for your operating system. You can use docker to run it using command -

```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4-management
```

## Configuration

1. **Environment Variables:**
   For simplicity, I have committed .env file. Following environment variables are needed in .env file at root -

```
PORT=3000
RABBITMQ_URL=amqp://localhost
EXCHANGE_NAME=orders
```

## Running the Service

1. **Start the Service:**

For development:

```
npm run dev
```

For production:

```
npm start
```

2. **API Endpint:**

POST /orders: Create a new order.

Example request:

```
{
  "productId": "p1",
  "quantity": 5,
  "customerEmail": "customer@example.com"
}
```

## Testing

Run the test suite using Jest:

```
npm test
```

## License

This project is licensed under the MIT License.
