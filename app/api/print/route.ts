export async function GET() {
  const receiptData = {
    "0": {
      type: 4,
      content: `
        <div style="font-family: monospace; max-width: 300px; margin: 0 auto; text-align: center;">
          <h1 style="font-size: 20px; font-weight: bold;">TADSHEEN RECEIPT</h1>
          <hr style="border: 1px dashed #000;">
          <div style="display: flex; justify-content: space-between;">
            <span>Item</span>
            <span>Price</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Product 1</span>
            <span>$10.00</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Product 2</span>
            <span>$15.00</span>
          </div>
          <hr style="border: 1px dashed #000;">
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>Total</span>
            <span>$25.00</span>
          </div>
          <p style="font-size: 12px; margin-top: 10px;">Thank you for your purchase!</p>
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