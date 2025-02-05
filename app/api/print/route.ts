export async function GET() {
  const printData = {
    data: [
      {
        type: 0,
        content: 'Hello World!',
        bold: 1,
        align: 1,
        format: 0
      }
    ]
  };

  return new Response(JSON.stringify(printData), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}