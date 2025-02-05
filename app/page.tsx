"use client";

import { useState } from "react";

export default function PrintPage() {
  const [htmlContent, setHtmlContent] = useState("");

  const handlePrint = async () => {
    if (!htmlContent) {
      alert("Please enter HTML content");
      return;
    }

    const receiptData = {
      "0": {
        type: 4,
        content: htmlContent,
      },
    };

    try {
      await fetch("/api/print", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receiptData),
      });

      const printUrl = `my.bluetoothprint.scheme://https://tadsheen.vercel.app/api/print`;
      const link = document.createElement("a");
      link.href = printUrl;
      link.click();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Thermal Printer HTML Input</h1>
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="w-full h-40 p-2 border rounded mb-4"
          placeholder="Enter HTML content to print"
        />
        <button
          onClick={handlePrint}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Print HTML
        </button>
      </div>
    </div>
  );
}
