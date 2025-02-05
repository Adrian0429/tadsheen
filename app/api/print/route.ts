export async function GET() {
  const receiptData = {
    "0": {
      type: 4,
      content: `
        <div style="width: 100%; text-align: center; font-size: 24px;">
          <br><br>
          <h1 style="font-size: 36px;">TADSHEEN STORE</h1>
          <p>Item: Product</p>
          <p>Price: $10.00</p>
          <p>Thank You!</p>
          <br><br>
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