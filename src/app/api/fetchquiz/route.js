import axios from 'axios';

export async function GET(req) {
  try {
    const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error('Error fetching quiz data:', error.response ? error.response.data : error.message);
    return new Response(JSON.stringify({ message: 'Error fetching quiz data', error: error.message }), { status: 500 });
  }
}
