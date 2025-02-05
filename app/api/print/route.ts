export async function GET() {
  const receiptData = {
    "0": {
      type: 4,
      content: `
        <div style="text-align: center;">
          <h1>TADSHEEN STORE</h1>
          <p>Item: Product</p>
          <p>Price: $10.00</p>
          <p>Thank You!</p>
        </div>
      `
    }
  };

  return new Response(JSON.stringify(receiptData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}