import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the input 
    if (!body || !body['0'] || !body['0'].content) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}