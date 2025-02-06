export async function GET() {
  const receiptData = {
    "0": {
      type: 0,
      content: "This text has<br />three<br />lines",
      bold: 0,
      align: 0,
      format: 4
    }
  };

  return new Response(JSON.stringify(receiptData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}