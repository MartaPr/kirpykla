import axios from 'axios';
import {
  ADD_SLIDER_ITEM,
  REMOVE_SLIDER_ITEM,
  GET_SLIDER_ITEM,
  GET_SLIDER,
  UPDATE_SLIDER,
  DELETE_SLIDER_ITEM,
  GET_SLIDER_BY_ID,
} from './types';

import { SLIDER_SERVER } from '../components/utils/misc';

export function addSliderItem(datatoSubmit) {
  const request = axios
    .post(`${SLIDER_SERVER}/item`, datatoSubmit)
    .then((response) => response.data);
  return {
    type: ADD_SLIDER_ITEM,
    payload: request,
  };
}

export function getSlider() {
  const request = axios
    .get(`${SLIDER_SERVER}/items`)
    .then((response) => response.data);
  return {
    type: GET_SLIDER,
    payload: request,
  };
}

export function getSliderImages() {
  const request = axios.post(`${SLIDER_SERVER}/images`).then((response) => {
    let newState = [...response.data.item];
    return {
      size: response.data.size,
      item: newState,
    };
  });
  return {
    type: GET_SLIDER_ITEM,
    payload: request,
  };
}

export function getSliderById(id) {
  const request = axios
    .get(`/api/slider/item/${id}`)
    .then((response) => response.data);

  return {
    type: GET_SLIDER_BY_ID,
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
