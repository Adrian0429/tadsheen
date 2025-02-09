import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // ✅ Correct synchronous destructuring
    console.log(`ID Transaksi: ${id}`);

    const apiUrl = `https://emerging-pig-liberal.ngrok-free.app/api/transaksi/print-mobile`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNCIsInJvbGUiOiJhZG1pbiIsImlzcyI6IlRlbXBsYXRlIiwiZXhwIjoxNzM5MTU3MzYzLCJpYXQiOjE3MzkxMTQxNjN9.alUzVvu4lTXFXxvZTK4M1ZKcwcVswl5_2-vbPG_6akE",
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const data = response.data;
    console.log(data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
