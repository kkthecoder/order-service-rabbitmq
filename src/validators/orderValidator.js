exports.validateOrderData = (orderData) => {
  const errors = [];

  if (!orderData.productId) {
    errors.push("Product ID is required.");
  }
  if (!orderData.quantity || orderData.quantity <= 0) {
    errors.push("Quantity must be greater than zero.");
  }
  if (!orderData.customerEmail || !validateEmail(orderData.customerEmail)) {
    errors.push("A valid customer email is required.");
  }

  return errors;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
