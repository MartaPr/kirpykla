import {
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        services: action.payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        services: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addProduct: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProduct: action.payload,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        updateProduct: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deleted: action.payload,
      };
    default:
      return state;
  }
}
