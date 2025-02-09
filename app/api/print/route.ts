export async function GET() {
  const receiptData = {
    // Header with store name
    "0": {
      type: 0,
      content: "<center><span style=\"font-weight:bold; font-size:20px;\">UD. BUMI SUBUR</span></center>",
      bold: 1,
      align: 1,
      format: 4
    },
    // Store address line 1
    "1": {
      type: 0,
      content: "<center>JL Jenderal Ahmad Yani, Bugis, Tanjung</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Store address line 2
    "2": {
      type: 0,
      content: "<center>Redeb, Berau, 77312, Indonesia</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Phone number
    "3": {
      type: 0,
      content: "<center>055421126</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Separator
    "4": {
      type: 0,
      content: "<center>--------------------------------</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Receipt number
    "5": {
      type: 0,
      content: "No. Nota   : {receipt_number}",
      bold: 0,
      align: 0,
      format: 1
    },
    // Date and time
    "6": {
      type: 0,
      content: "Tanggal    : {date} {time}",
      bold: 0,
      align: 0,
      format: 1
    },
    // Separator before items
    "7": {
      type: 0,
      content: "<center>--------------------------------</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Items section - this would be dynamically generated based on items
    "8": {
      type: 0,
      content: "{item_name}\n{size}-{color}   {quantity} x {price}           {subtotal}",
      bold: 0,
      align: 0,
      format: 1
    },
    // Separator after items
    "9": {
      type: 0,
      content: "<center>--------------------------------</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Total items
    "10": {
      type: 0,
      content: "{total_items} Items",
      bold: 0,
      align: 0,
      format: 1
    },
    // Discount
    "11": {
      type: 0,
      content: "Total Diskon: {discount}",
      bold: 0,
      align: 0,
      format: 1
    },
    // Total amount
    "12": {
      type: 0,
      content: "Total                  {total_amount}",
      bold: 1,
      align: 0,
      format: 1
    },
    // Separator
    "13": {
      type: 0,
      content: "<center>--------------------------------</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Payment method
    "14": {
      type: 0,
      content: "Pembayaran : {payment_method}",
      bold: 0,
      align: 0,
      format: 1
    },
    // Final separator
    "15": {
      type: 0,
      content: "<center>--------------------------------</center>",
      bold: 0,
      align: 1,
      format: 1
    },
    // Thank you message
    "16": {
      type: 0,
      content: "<center>Terima kasih atas kunjungan Anda!</center>",
      bold: 0,
      align: 1,
      format: 1
    }
  };

  return new Response(JSON.stringify(receiptData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}