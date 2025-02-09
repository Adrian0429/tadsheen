import axios from 'axios';


export async function GET(
  { params }: { params: { id: string } }  // ✅ Correctly accessing params
) {

    const {id} = await params;
    console.log(`ID Transaksi: ${id}`);

    const apiUrl = `https://emerging-pig-liberal.ngrok-free.app/api/transaksi/print-mobile`;
    const response = await axios.get(apiUrl, {
      headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNCIsInJvbGUiOiJhZG1pbiIsImlzcyI6IlRlbXBsYXRlIiwiZXhwIjoxNzM5MTU3MzYzLCJpYXQiOjE3MzkxMTQxNjN9.alUzVvu4lTXFXxvZTK4M1ZKcwcVswl5_2-vbPG_6akE'
      }
    });
    const data = await response.data;
    console.log(data);

    return new Response(JSON.stringify(data))
}

