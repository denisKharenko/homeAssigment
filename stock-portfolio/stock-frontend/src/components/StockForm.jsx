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
    updated.splice(index, 1);
    setStocks(updated.length > 0 ? updated : [{ symbol: "", quantity: "" }]);
  };

  const handleClearRow = () => {
    setStocks([{ symbol: "", quantity: "" }]);
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
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
        {/* Page heading */}
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
        📈 Stock Portfolio Calculator
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        }}
      >
        {stocks.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
              gap: "10px",
              padding: "10px",
              background: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <input
              type="text"
              placeholder="Symbol"
              value={s.symbol}
              onChange={(e) => handleChange(idx, "symbol", e.target.value)}
              required
              style={{
                width: "100px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            />
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Quantity"
              value={s.quantity}
              onChange={(e) => handleChange(idx, "quantity", e.target.value)}
              required
              style={{
                width: "80px",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {stocks.length === 1 ? (
              <button
                type="button"
                onClick={handleClearRow}
                style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
              >
                Clear Row
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleRemoveRow(idx)}
                style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}
              >
                Remove Row
              </button>
            )}
          </div>
        ))}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            justifyContent: "flex-start",
          }}
        >
          <button type="button" onClick={handleAddRow} style={{ ...buttonStyle, backgroundColor: "#3498db" }}>
            Add Stock
          </button>
          <button type="submit" style={{ ...buttonStyle, backgroundColor: "#2ecc71" }}>
            Check Stocks
          </button>
        </div>

        {/* Display history */}
        {history.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#2c3e50" }}>History</h3>
            {history.map((h, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  margin: "12px 0",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#fafafa",
                }}
              >
                <p>
                  <strong>Time:</strong> {h.timestamp}
                </p>
                <ResultList results={h.results} total={h.portfolioTotal} />
                <ErrorList errors={h.errors} />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

// Reusable button style
const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  color: "#fff",
  fontWeight: "bold",
  transition: "background 0.3s",
};
