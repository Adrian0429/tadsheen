import { NextRequest } from "next/server";
import axios from "axios";

// Define TypeScript types for API response
interface TransactionDetail {
  detail_transaksi_id: number;
  detail_produk_id: number;
  merk: string;
  nama_produk: string;
  jenis: string;
  ukuran: string;
  jumlah_item: number;
  harga_produk: number;
}

interface TransactionData {
  id_transaksi: number;
  tanggal_transaksi: string;
  total_harga: number;
  metode_bayar: string;
  diskon: number;
  detail_transaksi: TransactionDetail[];
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: TransactionData;
}

// Define TypeScript types for receipt item
interface ReceiptItem {
  align: number;
  bold: number;
  content: string;
  format: number;
  type: number;
}

// Function to transform API response into formatted JSON
function formatReceipt(apiResponse: ApiResponse): Record<string, ReceiptItem> {
  if (!apiResponse.status || !apiResponse.data) {
    throw new Error("Invalid API response structure");
  }

  const data = apiResponse.data;
  const receipt: Record<string, ReceiptItem> = {};
  let index = 0;

  receipt[index++] = { align: 1, bold: 0, content: "UD. BUMI SUBUR", format: 1, type: 0 };
  receipt[index++] = { align: 1, bold: 0, content: "Jl. Jenderal Ahmad Yani, Bugis, Tanjung Redeb,\nBerau, 77312, Indonesia", format: 4, type: 0 };
  receipt[index++] = { align: 0, bold: 0, content: `No. Nota    : ${data.id_transaksi}`, format: 4, type: 0 };
  receipt[index++] = { align: 0, bold: 0, content: `tanggal     : ${new Date(data.tanggal_transaksi).toLocaleString()}`, format: 4, type: 0 };
  receipt[index++] = { align: 1, bold: 0, content: "---------------------------------------", format: 0, type: 0 };

  data.detail_transaksi.forEach((item) => {
    receipt[index++] = { align: 0, bold: 0, content: `${item.merk} - ${item.nama_produk}`, format: 0, type: 0 };
    receipt[index++] = {
      align: 0,
      bold: 0,
      content: `${item.ukuran} | ${item.jumlah_item} pcs | ${item.harga_produk} = ${item.jumlah_item * item.harga_produk}`,
      format: 0,
      type: 0,
    };
  });

  receipt[index++] = { align: 1, bold: 0, content: "---------------------------------------", format: 0, type: 0 };
  receipt[index++] = { align: 0, bold: 0, content: `${data.detail_transaksi.length} item`, format: 4, type: 0 };
  receipt[index++] = { align: 0, bold: 0, content: `Diskon: ${data.diskon}`, format: 4, type: 0 };
  receipt[index++] = { align: 0, bold: 1, content: `Total ${data.total_harga - data.diskon}`, format: 0, type: 0 };
  receipt[index++] = { align: 1, bold: 0, content: "Terima Kasih Atas Kunjungan Anda", format: 1, type: 0 };

  return receipt;
}

// Next.js API Route
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiUrl = `https://emerging-pig-liberal.ngrok-free.app/api/transaksi/print-mobile/${id}`;

    const response = await axios.get<ApiResponse>(apiUrl, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNCIsInJvbGUiOiJhZG1pbiIsImlzcyI6IlRlbXBsYXRlIiwiZXhwIjoxNzM5MTY0MzQ5LCJpYXQiOjE3MzkxMjExNDl9.14Ov66NvUjbeFDmJoiBmX_mxJOVGRR6DQkTS1cPV1sE",
      },
    });

    const formattedData = formatReceipt(response.data);

    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
