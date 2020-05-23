import {
  ADD_SLIDER_ITEM,
  REMOVE_SLIDER_ITEM,
  GET_SLIDER_ITEM,
  GET_SLIDER,
  UPDATE_SLIDER,
  DELETE_SLIDER_ITEM,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SLIDER:
      return {
        ...state,
        slider: action.payload,
        size: action.payload,
      };
    case GET_SLIDER_ITEM:
      return {
        ...state,
        sliderImg: action.payload.item,
      };
    case ADD_SLIDER_ITEM:
      return {
        ...state,
        addSlider: action.payload,
      };
    case UPDATE_SLIDER:
      return {
        ...state,
        updateSlider: action.payload,
      };
    case REMOVE_SLIDER_ITEM:
      return {
        ...state,
        clearSlider: action.payload,
      };
    case DELETE_SLIDER_ITEM:
      return {
        ...state,
        deleted: action.payload,
      };
    default:
      return state;
  }
}
