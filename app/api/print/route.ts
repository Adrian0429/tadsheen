export async function GET() {
  const printData = {
    "0": {
      type: 0,
      content: "Hello World!",
      bold: 1,
      align: 2,
      format: 3
    }
  };

  return new Response(JSON.stringify(printData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}