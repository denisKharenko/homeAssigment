import React from "react";

function History({ history }) {
  if (history.length === 0) return null; // don't show anything if no history

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🕒 History of Requests</h2>

      {history.map((entry, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <strong>Request #{history.length - idx}</strong> —{" "}
            <em>{entry.time.toLocaleString()}</em>
          </div>
          {entry.stocks && entry.stocks.length > 0 && (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Symbol</th>
                  <th style={thStyle}>Quantity</th>
                  <th style={thStyle}>Price ($)</th>
                  <th style={thStyle}>Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {entry.stocks.map((s, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{s.symbol}</td>
                    <td style={tdStyle}>{s.quantity}</td>
                    <td style={tdStyle}>{s.price.toFixed(2)}</td>
                    <td style={tdStyle}>{s.totalValue.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan="3"
                    style={{ ...tdStyle, textAlign: "right", fontWeight: "bold" }}
                  >
                    Total Portfolio:
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "bold" }}>
                    ${entry.portfolioTotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

// Styles for table
const thStyle = {
  borderBottom: "1px solid #888",
  padding: "6px 10px",
  textAlign: "left",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "6px 10px",
};

export default History;
