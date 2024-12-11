// importing modules and packages
import axios from 'axios';
import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// getting DOM elements
const form = document.getElementById('search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

// adding event listener to the input
form.addEventListener('submit', event => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search term.',
      position: 'topRight',
      backgroundColor: '#ef4040',
      class: 'custom-toast-error',
    });
    return;
  }

  // clearing the gallery and showing the loader
  clearGallery();
  showLoader(loader);

  // fetching the images from the server
  fetchImages(query)
    .then(data => {
      hideLoader(loader); // hiding the loader

      // sending the warning if the are no images for the query
      if (data.hits.length === 0) {
        iziToast.warning({
          message: 'Sorry, there are no images matching your search query.',
          position: 'topRight',
          backgroundColor: '#ef4040',
          class: 'custom-toast-error',
        });
        return;
      }

      // rendering the gallery with query informations
      renderGallery(data.hits);
    })

    // sending the warning if there's an error
    .catch(error => {
      hideLoader(loader);
      iziToast.error({
        message: 'Something went wrong. Please try again.',
        position: 'topRight',
        backgroundColor: '#ef4040',
        class: 'custom-toast-error',
      });
      console.error(error);
    });
});
