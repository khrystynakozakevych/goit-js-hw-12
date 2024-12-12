import axios from 'axios';

// pixabay api
const API_KEY = '47584344-4fbbfc2b4e03cd845aed0766f';
const BASE_URL = 'https://pixabay.com/api/';

// fetching the images from the server
export async function fetchImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 15,
  });

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
