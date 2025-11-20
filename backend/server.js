const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/config/db');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');
const logger = require('./src/utils/logger');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount routes CORRECTLY
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/scrap", require("./src/routes/scrap.routes"));
app.use("/api/malwa", require("./src/routes/malwa.routes"));
app.use("/api/dealer", require("./src/routes/dealer.routes"));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'scrap-deal-backend' });
});

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
