"use client";


export default function PrintPage() {
  const handlePrint = () => {
    const printUrl =
      "my.bluetoothprint.scheme://https://tadsheen.vercel.app/api/print";
    const link = document.createElement("a");
    link.href = printUrl;
    link.click();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Bluetooth Thermal Printer</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Print Hello World
        </button>
      </div>
    </div>
  );
}
