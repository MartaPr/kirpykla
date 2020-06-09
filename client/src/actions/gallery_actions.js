import axios from 'axios';
import {
  ADD_GALLERY_ITEM,
  REMOVE_GALLERY_ITEM,
  GET_GALLERY_ITEM,
  GET_GALLERY,
  DELETE_GALLERY,
} from './types';

import { GALLERY_SERVER } from '../components/utils/misc';

export function getGallery() {
  const request = axios
    .get(`${GALLERY_SERVER}/items`)
    .then((response) => response.data);
  return {
    type: GET_GALLERY,
    payload: request,
  };
}

export function addGallery(datatoSubmit) {
  const request = axios
    .post(`${GALLERY_SERVER}/item`, datatoSubmit)
    .then((response) => response.data);
  return {
    type: ADD_GALLERY_ITEM,
    payload: request,
  };
}

export function getGalleryItems(skip, limit) {
  const request = axios.post(`${GALLERY_SERVER}/images`).then((response) => {
    let newState = [...response.data.item];
    return {
      size: response.data.size,
      item: newState,
    };
  });
  return {
    type: GET_GALLERY_ITEM,
    payload: request,
  };
}

export function deleteGallery(_id) {
  const request = axios
    .delete(`${GALLERY_SERVER}/item/${_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return false;
    });

  return {
    type: DELETE_GALLERY,
    payload: request,
  };
}

export function clearGallery() {
  return {
    type: REMOVE_GALLERY_ITEM,
    payload: '',
  };
}
