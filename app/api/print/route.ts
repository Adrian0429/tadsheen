import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Construct JSON payload for printing
  const printData = [
    {
      type: 0, // text
      content: 'Hello World!',
      bold: 1,
      align: 1, // center
      format: 0 // normal
    }
  ];

  // Send JSON response
  res.status(200).json(printData);
}