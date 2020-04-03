import {
  ADD_GALLERY_ITEM,
  REMOVE_GALLERY_ITEM,
  GET_GALLERY_ITEM
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SERVICE:
      return {
        ...state,
        getService: action.payload
      };
    case GET_GALLERY_ITEM:
      return {
        ...state,
        items: action.payload
      };
    case ADD_GALLERY_ITEM:
      return {
        ...state,
        addGallery: action.payload
      };
    case REMOVE_GALLERY_ITEM:
      return {
        ...state,
        clearGallery: action.payload
      };
    default:
      return state;
  }
}
