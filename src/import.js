import React from "react";
import QrReader from "react-qr-reader";

export default ({ importHandler }) => {
  const handleScan = data => {
    importHandler(JSON.parse(data));
  };
  const handleError = err => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        style={{ width: "100%" }}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
};
