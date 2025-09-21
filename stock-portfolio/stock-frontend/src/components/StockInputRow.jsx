import React from "react";

function StockInputRow({ index, symbol, quantity, onChange, onRemove }) {
  return (
    <div style={{ marginBottom: "8px", display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => onChange(index, "symbol", e.target.value)}
        style={{ width: "100px" }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => onChange(index, "quantity", e.target.value)}
        style={{ width: "80px" }}
      />
      <button type="button" onClick={() => onRemove(index)} style={{ color: "red" }}>
        ❌
      </button>
    </div>
  );
}

export default StockInputRow;
