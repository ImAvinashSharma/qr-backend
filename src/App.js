import "./App.css";
import React from "react";
import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import db from "./db.json";

function App() {
  const [data, setData] = useState([]);
  function formatAMPM(date) {
    const hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    return ampm;
  }
  function SendMsg(data) {
    const ampm = formatAMPM(new Date());
    const homeCol = ampm === "am" ? "College" : "Home";
    // axios
    //   .post("http://localhost:3001/sms", {
    //     phone: db[data][0].phone,
    //     message: `${db[data][0].name} is on the way to ${homeCol}.`
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    console.log(db[data][0].name + " " + db[data][0].phone);
  }
  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        delay={8}
        torch={true}
        onUpdate={(err, result) => {
          if (result) {
            setData([result.text]);
            SendMsg(data);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
}

export default App;
