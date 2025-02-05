"use client";

import React, { useState } from "react";

const BluetoothPrintButton = () => {
  const [status, setStatus] = useState("Idle");

  const handlePrint = async () => {
    try {
      setStatus("Searching for RPP02N...");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const device = await(navigator as any).bluetooth.requestDevice({
        acceptAllDevices: true, // Discover all Bluetooth devices
        optionalServices: [0x1812], // Still request HID service
      });

      setStatus(`Connecting to ${device.name}...`);
      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService(0x1812);
      const characteristic = await service?.getCharacteristic(0x2a4d);

      const encoder = new TextEncoder();
      const printData = encoder.encode("Hello, RPP02N!\n\n\n");

      await characteristic?.writeValue(printData);
      setStatus("Print sent successfully! ✅");
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handlePrint}
        className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
      >
        Print via Bluetooth
      </button>
      <p className="mt-4 text-gray-700">{status}</p>
    </div>
  );
};

export default BluetoothPrintButton;
