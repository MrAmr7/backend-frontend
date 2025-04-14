// middleware/logger.js
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();  // Get the current time in ISO format
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

module.exports = logger;
