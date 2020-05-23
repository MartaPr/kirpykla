import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './product_reducer';
import gallery from './gallery_reducer';
import contacts from './contacts_reducer';
import slider from './slider_reducer';

const rootReducer = combineReducers({
  user,
  products,
  gallery,
  contacts,
  slider,
});

export default rootReducer;
