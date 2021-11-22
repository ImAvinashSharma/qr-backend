import "./App.css";
import { useState } from "react";
import QrReader from "react-qr-reader";

function App() {
  const [result, setResult] = useState("No result");
  function handleScan(data) {
    if (data) {
      console.log(data);
      setResult(data);
    }
  }
  function handleError(err) {
    console.error(err);
  }
  return (
    <div>
      <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "50%" }} />
      <p>{result}</p>
    </div>
  );
}

export default App;
