import React, { useState } from "react";
import StockForm from "./components/StockForm";
import Results from "./components/ResultList";
import History from "./components/History";

function App() {
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);

  const handleResults = (data) => {
    const timestampedData = { ...data, time: new Date() }; // add current date/time
    setResults(timestampedData);
    setHistory((prev) => [timestampedData, ...prev]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <StockForm onResults={handleResults} />
      {results && <Results data={results} />}
      <History history={history} />
    </div>
  );
}

export default App;
