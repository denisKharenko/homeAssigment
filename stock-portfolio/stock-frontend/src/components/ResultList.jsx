export default function ResultList({ results, total }) {
  if (!results || results.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h4>Valid Results:</h4>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            {r.symbol} - Qty: {r.quantity} × ${r.price} = ${r.totalValue.toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Portfolio Total:</strong> ${total.toFixed(2)}</p>
    </div>
  );
}
