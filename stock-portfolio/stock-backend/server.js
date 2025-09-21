const express = require('express');
const cors = require("cors");

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Import stock route
const stockRoute = require('./routes/stock');

// Use the route
app.use('/stock', stockRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
