import React from "react";

const BluetoothPrintButton = () => {
  const handlePrint = () => {
    const responseUrl = "https://tadsheen.vercel.app/response.php"; // Updated to your Vercel deployment
    const printUrl = `my.bluetoothprint.scheme://${responseUrl}`;

    // Redirect to the Bluetooth Print app
    window.location.href = printUrl;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handlePrint}
        className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
      >
        Print via Bluetooth
      </button>
    </div>
  );
};

export default BluetoothPrintButton;
