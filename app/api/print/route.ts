import { getReceiptData } from "@/app/utils/getdata";

export async function GET(request: Request) {
  try {
    // Get the URL from the request
    const url = new URL(request.url);
    
    // Extract id_transaksi from the searchParams
    const id_transaksi = url.searchParams.get('id_transaksi');
    
    // Validate id_transaksi
    if (!id_transaksi) {
      return new Response(JSON.stringify({ error: 'id_transaksi is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const receiptData = await getReceiptData(Number(1));

    return new Response(JSON.stringify(receiptData), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err: unknown) {
    // Type guard to check if error is an Error object
    const errorMessage = err instanceof Error ? err.message : 'Failed to fetch receipt data';
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}