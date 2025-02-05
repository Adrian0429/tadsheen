"use client";

const Home = () => {
  const handleConnectAndPrint = () => {
    if (typeof window !== "undefined") {
      import("../app/print").then(({ startBluetoothPrint }) => {
        startBluetoothPrint();
      });
    }
  };

  return (
    <div>
      <h1>Bluetooth Print</h1>
      <button id="connect" onClick={handleConnectAndPrint}>
        Connect and Print
      </button>
      <p id="status"></p>
    </div>
  );
};

export default Home;
