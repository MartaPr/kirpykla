import axios from 'axios';
import {
  ADD_GALLERY_ITEM,
  REMOVE_GALLERY_ITEM,
  GET_GALLERY_ITEM
} from './types';

import { GALLERY_SERVER } from '../components/utils/misc';

export function getGallery() {
  const request = axios
    .get(`${GALLERY_SERVER}/item`)
    .then(response => response.data);
  console.log(request);

  return {
    type: GET_GALLERY_ITEM,
    payload: request
  };
}

export function addGallery(datatoSubmit) {
  const request = axios
    .post(`${GALLERY_SERVER}/items`, datatoSubmit)
    .then(response => response.data);

  return {
    type: ADD_GALLERY_ITEM,
    payload: request
  };
}

export function clearGallery() {
  return {
    type: REMOVE_GALLERY_ITEM,
    payload: ''
  };
}
