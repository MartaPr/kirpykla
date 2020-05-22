import axios from 'axios';
import {
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';

export function getProducts() {
  const request = axios
    .get(`${PRODUCT_SERVER}/service`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCT,
    payload: request,
  };
}

export function getProductById(id) {
  const request = axios
    .get(`${PRODUCT_SERVER}/service/${id}`)
    .then((response) => response.data);

  return {
    type: GET_PRODUCT_BY_ID,
    payload: request,
  };
}

export function addProduct(datatoSubmit) {
  const request = axios
    .post(`${PRODUCT_SERVER}/service`, datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}

export function updateProduct(dataToSubmit, id) {
  const request = axios
    .patch(`${PRODUCT_SERVER}/service/${id}`, dataToSubmit)
    .then((response) => {
      return response.data;
    });

  return {
    type: UPDATE_PRODUCT,
    payload: request,
  };
}

export function deleteProduct(_id) {
  const request = axios
    .delete(`${PRODUCT_SERVER}/service/${_id}`)
    .then((response) => response.data)
    .catch((err) => {
      return false;
    });

  return {
    type: DELETE_PRODUCT,
    payload: request,
  };
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: '',
  };
}
