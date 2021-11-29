import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import db from "./db.json";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState();
  const [scannre, setScannre] = useState(true);
  const [namePer, setName] = useState("");
  function formatAMPM(date) {
    const hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    return ampm;
  }
  function SendMsg(data) {
    const ampm = formatAMPM(new Date());
    const homeCol = ampm === "am" ? "College" : "Home";
    if (db[data]) {
      const phone = db[data][0].phone;
      const name = db[data][0].name;
      setName(name + "message send successfully");
      axios
        .post("http://localhost:3001/sms", {
          phone: phone,
          message: `${name} is on the way to ${homeCol}.`
        })

        .then(function (response) {
          setData(undefined);
          console.log(response);
        })
        .catch(function (error) {
          setData(undefined);
          setName("");
          console.log(error);
          alert("Student is already pressent in the BUS ");
        });
      console.log(db[data][0].name + " " + db[data][0].phone);
    } else {
      alert("NOT FROM COLLEGE BUS");
      setName("");
      setData(undefined);
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      SendMsg(data);
    }
  }, [data]);

  return (
    <div className="container">
      {scannre === true ? (
        <div className="qrScanner">
          <BarcodeScannerComponent
            width={500}
            height={500}
            delay={100}
            torch={true}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
              }
            }}
          />
          <p>{data}</p>
          <p>{namePer}</p>
        </div>
      ) : null}
      <button className="btn" type="submit" onClick={e => setScannre(!scannre)}>
        {scannre !== true ? "Scan" : "Stop"}
      </button>
    </div>
  );
}

export default App;
