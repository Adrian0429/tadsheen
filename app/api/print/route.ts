import { NextResponse } from 'next/server';

export async function GET() {
  const printData = [
    {
      type: 0, // text
      content: 'Hello World!',
      bold: 1,
      align: 1, // center
      format: 0 // normal
    }
  ];

  return NextResponse.json(printData);
}