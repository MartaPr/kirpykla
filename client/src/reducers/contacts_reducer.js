import { ADD_CONTACTS, GET_CONTACTS, UPDATE_CONTACTS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    case ADD_CONTACTS:
      return {
        ...state,
        addContacts: action.payload,
      };
    case UPDATE_CONTACTS:
      return {
        ...state,
        updateContacts: action.payload,
      };
    default:
      return state;
  }
}
