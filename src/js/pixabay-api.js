import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

import { imagesTemplate } from './render-functions.js';
import { errorObj } from '../main.js';

export async function fetchImages(params) {
  try {
    const res = await axios.get('/api/', { params });
    const result = res.data.hits;
    params.totalHits = res.data.totalHits;
    if (result.length === 0) {
      throw new Error();
    }
    imagesTemplate(result);
  } catch {
    iziToast.error(errorObj);
    return;
  }
}
