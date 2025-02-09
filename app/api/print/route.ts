export async function GET() {
  const receiptData = {
    // Header with store name
    "0": {
      type: 0,
      content: "UD. BUMI SUBUR",
      bold: 0,
      align: 1,
      format: 1
    },
    // Store address line 1
    "1": {
      type: 0,
      content: "Jl. Jenderal Ahmad Yani, Bugis, Tanjung Redeb, Berau, 77312, Indonesia",
      bold: 0,
      align: 1,
      format: 4
    },
    // Store address line 2
    "2": {
      type: 0,
      content: "No. Nota    : 0001",
      bold: 0,
      align: 1,
      format: 4
    },
    // Phone number
    "3": {
      type: 0,
      content: "tanggal     : 2021-08-01 12:00:00",
      bold: 0,
      align: 1,
      format: 4
    },
    // Separator
    "4": {
      type: 0,
      content: "---------------------------------------",
      bold: 0,
      align: 1,
      format: 0
    },
    // Receipt number
    "5": {
      type: 0,
      content: "Cardinal - Kaos Polos Navy",
      bold: 0,
      align: 0,
      format: 0
    },
    // Date and time
    "6": {
      type: 4,
      content: "<div style=\"display: flex; flex-direction: row; justify-content: space-evenly;\"><p>L</p><p>2 X 420.000</p><p>840.000</p></div>",
    },
    // Separator before items
    "7": {
      type: 0,
      content: "---------------------------------------",
      bold: 0,
      align: 1,
      format: 0
    },
    // Items section - this would be dynamically generated based on items
    "8": {
      type: 4,
      content: "<div style=\"display: flex; flex-direction: row; justify-content: space-evenly;\"><p>L</p><p>2 X 420.000</p><p>840.000</p></div>",
    },
    // Separator after items
    "9": {
      type: 0,
      content: "---------------------------------------",
      bold: 0,
      align: 1,
      format: 0
    },
    // Total items
    "10": {
      type: 0,
      content: "10 item",
      bold: 0,
      align: 0,
      format: 4
    },
    // Discount
    "11": {
      type: 0,
      content: "Diskon: {discount}",
      bold: 0,
      align: 0,
      format: 1
    },
    // Total amount
    "12": {
      type: 0,
      content: "Total 840.000",
      bold: 1,
      align: 0,
      format: 1
    },
    // Separator
    "13": {
      type: 0,
      content: "Terima Kasih Atas Kunjungan Anda",
      bold: 0,
      align: 1,
      format: 1
    },
   
  };

  return new Response(JSON.stringify(receiptData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}