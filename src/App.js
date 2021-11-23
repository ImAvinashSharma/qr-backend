import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import db from "./db.json";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState();
  const [scannre, setScannre] = useState(true);
  function formatAMPM(date) {
    const hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    return ampm;
  }
  function SendMsg(data) {
    const ampm = formatAMPM(new Date());
    const homeCol = ampm === "am" ? "College" : "Home";
    axios
      .post("http://localhost:3001/sms", {
        phone: db[data][0].phone,
        message: `${db[data][0].name} is on the way to ${homeCol}.`
      })

      .then(function (response) {
        setData(undefined);
        console.log(response);
      })
      .catch(function (error) {
        alert("Student is already pressent in the BUS or NOT FROM COLLEGE BUS");
        setData(undefined);
        console.log(error);
      });
    console.log(db[data][0].name + " " + db[data][0].phone);
    // console.log(db);
  }

  useEffect(() => {
    if (data !== undefined) {
      SendMsg(data);
    }
  }, [data]);

  return (
    <>
      <button type="submit" onClick={e => setScannre(!scannre)}>
        {scannre !== true ? "Scan" : "Stop"}
      </button>
      {scannre === true ? (
        <>
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
        </>
      ) : (
        " "
      )}
    </>
  );
}

export default App;
