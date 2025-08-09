import axios from 'axios';

const API_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      per_page: 12,
      page,
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });
  return response.data;
};