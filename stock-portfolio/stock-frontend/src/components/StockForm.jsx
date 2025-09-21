import { useState } from "react";
import axios from "axios";
import ErrorList from "./ErrorList";
import ResultList from "./ResultList";

export default function StockForm() {
  const [stocks, setStocks] = useState([{ symbol: "", quantity: "" }]);
  const [history, setHistory] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...stocks];
    updated[index][field] = value;
    setStocks(updated);
  };

  const handleAddRow = () => {
    setStocks([...stocks, { symbol: "", quantity: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updated = [...stocks];
    updated.splice(index, 1); // remove one row at index
    setStocks(updated.length > 0 ? updated : [{ symbol: "", quantity: "" }]); 
    // ensure at least one row exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = stocks.map((s) => ({
      symbol: s.symbol.trim(),
      quantity: Number(s.quantity),
    }));

    try {
      const response = await axios.post("http://localhost:3000/stock", payload);
      const { results, errors, portfolioTotal } = response.data;

      const record = {
        timestamp: new Date().toLocaleString(),
        results,
        errors,
        portfolioTotal,
      };

      setHistory([record, ...history]);
    } catch (err) {
      const record = {
        timestamp: new Date().toLocaleString(),
        results: [],
        errors: [{ stock: {}, error: "Failed to fetch stock prices" }],
        portfolioTotal: 0,
      };
      setHistory([record, ...history]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {stocks.map((s, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Symbol"
              value={s.symbol}
              onChange={(e) => handleChange(idx, "symbol", e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Quantity"
              value={s.quantity}
              onChange={(e) => handleChange(idx, "quantity", e.target.value)}
              required
            />
            <button type="button" onClick={() => handleRemoveRow(idx)}>
              Remove Row
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddRow}>
          Add Stock
        </button>
        <button type="submit">Check Stocks</button>
      </form>

      {/* Display history */}
      <div style={{ marginTop: "2rem" }}>
        <h3>History</h3>
        {history.map((h, idx) => (
          <div
            key={idx}
            style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}
          >
            <p><strong>Time:</strong> {h.timestamp}</p>
            <ResultList results={h.results} total={h.portfolioTotal} />
            <ErrorList errors={h.errors} />
          </div>
        ))}
      </div>
    </div>
  );
}
