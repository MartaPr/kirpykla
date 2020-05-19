import axios from 'axios';
import {
  ADD_GALLERYNAME_ITEM,
  REMOVE_GALLERYNAME_ITEM,
  GET_GALLERYNAME_ITEM
} from './types';

import { GALLERYNAME_SERVER } from '../components/utils/misc';

export function getGalleryName() {
  const request = axios
    .get(`${GALLERYNAME_SERVER}/item`)
    .then(response => response.data);
  console.log(request);
  9;
  return {
    type: GET_GALLERYNAME_ITEM,
    payload: request
  };
}

export function addGalleryName(datatoSubmit) {
  const request = axios
    .post(`${GALLERY_SERVER}/list`, datatoSubmit)
    .then(response => response.data);

  return {
    type: ADD_GALLERYNAME_ITEM,
    payload: request
  };
}

export function clearGalleryName() {
  return {
    type: REMOVE_GALLERYNAME_ITEM,
    payload: ''
  };
}
