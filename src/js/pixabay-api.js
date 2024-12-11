// pixabay api
const API_KEY = '47584344-4fbbfc2b4e03cd845aed0766f';
const BASE_URL = 'https://pixabay.com/api/';

// fetching the images from the server
export function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params.toString()}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  });
}
