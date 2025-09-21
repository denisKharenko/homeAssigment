export default function ErrorList({ errors }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div style={{ color: "red", marginTop: "1rem" }}>
      <h4>Errors:</h4>
      <ul>
        {errors.map((e, idx) => (
          <li key={idx}>
            {e.error}{" "}
            {e.stock.symbol ? `(Symbol: ${e.stock.symbol}, Qty: ${e.stock.quantity})` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
