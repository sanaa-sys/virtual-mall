// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products'); // Assuming a products route

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Assuming a products route

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
