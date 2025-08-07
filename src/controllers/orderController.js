const orderService = require("../services/orderService");
const { validateOrderData } = require("../validators/orderValidator");
const CustomError = require("../utils/customError");

exports.createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;

    // Validate order data
    const validationErrors = validateOrderData(orderData);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Publish order to RabbitMQ
    await orderService.publishOrder(orderData);
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    next(new CustomError("Failed to create order", 500));
  }
};
