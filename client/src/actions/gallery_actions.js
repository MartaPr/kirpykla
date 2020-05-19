import axios from 'axios';
import {
  ADD_GALLERY_ITEM,
  REMOVE_GALLERY_ITEM,
  GET_GALLERY_ITEM,
  GET_GALLERY,
} from './types';

import { GALLERY_SERVER } from '../components/utils/misc';

export function getGallery() {
  const request = axios
    .get(`${GALLERY_SERVER}/items`)
    .then((response) => response.data);
  console.log('get gallery response', request);
  return {
    type: GET_GALLERY,
    payload: request,
  };
}

export function addGallery(datatoSubmit) {
  const request = axios
    .post(`${GALLERY_SERVER}/item`, datatoSubmit)
    .then((response) => response.data);
  console.log('res', request);
  return {
    type: ADD_GALLERY_ITEM,
    payload: request,
  };
}

export function getGalleryItems(skip, limit) {
  const data = {
    limit,
    skip,
  };

  const request = axios
    .post(`${GALLERY_SERVER}/images`, data)
    .then((response) => {
      let newState = [...response.data.item];
      return {
        size: response.data.size,
        item: newState,
      };
    });
  console.log('res items', request);
  return {
    type: GET_GALLERY_ITEM,
    payload: request,
  };
}

export function clearGallery() {
  return {
    type: REMOVE_GALLERY_ITEM,
    payload: '',
  };
}
