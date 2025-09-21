// routes/stock.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /stock
router.post('/', async (req, res) => {
  try {
    const stocks = req.body; // array of {symbol, quantity}

    if (!Array.isArray(stocks) || stocks.length === 0) {
      return res.status(400).json({ error: "No stocks sent" });
    }

    const apiKey = "49dd9277d2804ca5926c5f02af46fae1"; // you can replace with your Twelve Data API key
    const results = [];
    const errors = [];

    for (let stock of stocks) {
      const { symbol, quantity } = stock;

      if (!symbol || typeof symbol !== "string") {
        errors.push({ stock, error: "Invalid symbol" });
        continue;
      }

      if (!Number.isInteger(quantity) || quantity <= 0) {
        errors.push({ stock, error: "Quantity must be a positive integer" });
        continue;
      }

      try {
        const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
        const response = await axios.get(url);

        if (!response.data.price) {
          errors.push({ stock, error: `Stock symbol "${symbol}" not found` });
          continue;
        }

        const price = parseFloat(response.data.price);
        results.push({
          symbol,
          quantity,
          price,
          totalValue: price * quantity,
        });

      } catch (err) {
        errors.push({ stock, error: `Failed to fetch price for "${symbol}"` });
      }
    }

    const portfolioTotal = results.reduce((sum, s) => sum + s.totalValue, 0);

    res.json({ results, errors, portfolioTotal });

  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ stock: {}, error: "Server error" }] });
  }
});

module.exports = router;
