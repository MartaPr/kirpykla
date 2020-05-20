import {
  ADD_GALLERY_ITEM,
  REMOVE_GALLERY_ITEM,
  GET_GALLERY_ITEM,
  GET_GALLERY,
  DELETE_GALLERY,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        gallery: action.payload,
        size: action.payload,
      };
    case GET_GALLERY_ITEM:
      return {
        ...state,
        toGallery: action.payload.item,
        toGallerySize: action.payload.size,
      };
    case ADD_GALLERY_ITEM:
      return {
        ...state,
        addGallery: action.payload,
      };
    case REMOVE_GALLERY_ITEM:
      return {
        ...state,
        clearGallery: action.payload,
      };
    case DELETE_GALLERY:
      return {
        ...state,
        deleted: action.payload,
      };
    default:
      return state;
  }
}
