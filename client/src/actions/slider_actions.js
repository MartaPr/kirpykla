import axios from 'axios';
import {
  ADD_SLIDER_ITEM,
  REMOVE_SLIDER_ITEM,
  GET_SLIDER_ITEM,
  GET_SLIDER,
  UPDATE_SLIDER,
  DELETE_SLIDER_ITEM,
} from './types';

import { SLIDER_SERVER } from '../components/utils/misc';

export function addSliderItem(datatoSubmit) {
  const request = axios
    .post(`${SLIDER_SERVER}/item`, datatoSubmit)
    .then((response) => response.data);
  console.log('res', request);
  return {
    type: ADD_SLIDER_ITEM,
    payload: request,
  };
}

export function getSlider() {
  const request = axios
    .get(`${SLIDER_SERVER}/items`)
    .then((response) => response.data);
  console.log('get slider response', request);
  return {
    type: GET_SLIDER,
    payload: request,
  };
}

export function getSliderImages(skip, limit) {
  const request = axios.post(`${SLIDER_SERVER}/images`).then((response) => {
    let newState = [...response.data.item];
    return {
      size: response.data.size,
      item: newState,
    };
  });
  console.log('res items', request);
  return {
    type: GET_SLIDER_ITEM,
    payload: request,
  };
}

export function updateSlider(dataToSubmit, id) {
  const request = axios
    .patch(`${SLIDER_SERVER}/items/${id}`, dataToSubmit)
    .then((response) => {
      return response.data;
    });

  return {
    type: UPDATE_SLIDER,
    payload: request,
  };
}

export function deleteSliderItem(_id) {
  const request = axios
    .delete(`${SLIDER_SERVER}/item/${_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return false;
    });

  return {
    type: DELETE_SLIDER_ITEM,
    payload: request,
  };
}

export function clearSliderItem() {
  return {
    type: REMOVE_SLIDER_ITEM,
    payload: '',
  };
}
