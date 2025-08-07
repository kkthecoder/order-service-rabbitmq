const express = require("express");
const orderController = require("./controllers/orderController");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
// Use express.json() to parse JSON request bodies
app.use(express.json());

app.post("/orders", orderController.createOrder);

// Error handling middleware
app.use(errorHandler);

const config = require("./config/config");
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
