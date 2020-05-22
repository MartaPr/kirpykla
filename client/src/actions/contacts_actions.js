import axios from 'axios';
import { ADD_CONTACTS, GET_CONTACTS, UPDATE_CONTACTS } from './types';

export function getContacts() {
  const request = axios.get('/api/contacts').then((response) => response.data);

  return {
    type: GET_CONTACTS,
    payload: request,
  };
}

export function addContacts(datatoSubmit) {
  const request = axios
    .post('/api/contacts', datatoSubmit)
    .then((response) => response.data);

  return {
    type: ADD_CONTACTS,
    payload: request,
  };
}

export function updateContacts(dataToSubmit) {
  const request = axios
    .patch('/api/contacts/', dataToSubmit)
    .then((response) => {
      return response.data;
    });

  return {
    type: UPDATE_CONTACTS,
    payload: request,
  };
}
