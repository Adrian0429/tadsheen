import axios from 'axios';

// Type definitions
interface DetailTransaksi {
  detail_transaksi_id: number;
  detail_produk_id: number;
  merk: string;
  nama_produk: string;
  jenis: string;
  ukuran: string;
  jumlah_item: number;
  harga_produk: number;
}

interface Transaksi {
  id_transaksi: number;
  tanggal_transaksi: string; // ISO date string
  total_harga: number;
  metode_bayar: string;
  diskon: number;
  detail_transaksi: DetailTransaksi[];
}

interface ReceiptLine {
  type: number;
  content: string;
  bold: number;
  align: number;
  format: number;
}

interface ReceiptData {
  [key: string]: ReceiptLine;
}

interface GroupedItems {
  [key: string]: DetailTransaksi[];
}

export async function getReceiptData(id_transaksi: number): Promise<ReceiptData> {
  try {
    // Fetch transaction data
    const response = await axios.get<Transaksi>(
      `https://emerging-pig-liberal.ngrok-free.app/api/return/user/${id_transaksi}`,
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNCIsInJvbGUiOiJhZG1pbiIsImlzcyI6IlRlbXBsYXRlIiwiZXhwIjoxNzM5MTU0MTc3LCJpYXQiOjE3MzkxMTA5Nzd9.ITUInQWC6VJbufLHkPhgd2Np20iLpcjJphq_ZrPOJvU"
        }
      }
    );
    
    const transaction = response.data;
    
    // Group items by merk and nama_produk
    const groupedItems = transaction.detail_transaksi.reduce((acc: GroupedItems, item: DetailTransaksi) => {
      const key = `${item.merk} - ${item.nama_produk}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    const receiptData: ReceiptData = {
      "0": {
        type: 0,
        content: "UD. BUMI SUBUR",
        bold: 0,
        align: 1,
        format: 1
      },
      "1": {
        type: 0,
        content: "Jl. Jenderal Ahmad Yani, Bugis, Tanjung Redeb,\nBerau, 77312, Indonesia",
        bold: 0,
        align: 1,
        format: 4
      },
      "2": {
        type: 0,
        content: `No. Nota    : ${transaction.id_transaksi}`,
        bold: 0,
        align: 0,
        format: 4
      },
      "3": {
        type: 0,
        content: `Tanggal     : ${new Date(transaction.tanggal_transaksi).toLocaleString('id-ID')}`,
        bold: 0,
        align: 0,
        format: 4
      },
      "4": {
        type: 0,
        content: "---------------------------------------",
        bold: 0,
        align: 1,
        format: 0
      }
    };

    let lineCounter = 5;
    let totalItems = 0;

    // Add items to receipt
    for (const [productName, items] of Object.entries(groupedItems)) {
      // Add product name
      receiptData[lineCounter.toString()] = {
        type: 0,
        content: productName,
        bold: 0,
        align: 0,
        format: 0
      };
      lineCounter++;

      // Add each size variation
      items.forEach((item: DetailTransaksi) => {
        totalItems += item.jumlah_item;
        const subtotal = item.jumlah_item * item.harga_produk;
        
        receiptData[lineCounter.toString()] = {
          type: 0,
          content: `${item.ukuran} | ${item.jumlah_item} pcs | ${item.harga_produk.toLocaleString()} = ${subtotal.toLocaleString()}`,
          bold: 0,
          align: 0,
          format: 0
        };
        lineCounter++;
      });
    }

    // Add footer information
    receiptData[lineCounter.toString()] = {
      type: 0,
      content: "---------------------------------------",
      bold: 0,
      align: 1,
      format: 0
    };
    lineCounter++;

    receiptData[lineCounter.toString()] = {
      type: 0,
      content: `${totalItems} item`,
      bold: 0,
      align: 0,
      format: 4
    };
    lineCounter++;

    receiptData[lineCounter.toString()] = {
      type: 0,
      content: `Diskon: ${transaction.diskon.toLocaleString()}`,
      bold: 0,
      align: 0,
      format: 4
    };
    lineCounter++;

    receiptData[lineCounter.toString()] = {
      type: 0,
      content: `Total ${transaction.total_harga.toLocaleString()}`,
      bold: 1,
      align: 0,
      format: 0
    };
    lineCounter++;

    receiptData[lineCounter.toString()] = {
      type: 0,
      content: "Terima Kasih Atas Kunjungan Anda",
      bold: 0,
      align: 1,
      format: 1
    };

    return receiptData;

  } catch (error) {
    console.error('Error fetching receipt data:', error);
    throw error;
  }
}