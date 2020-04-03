import { combineReducers } from 'redux';

import user from './user_reducer';
import products from './product_reducer';
import items from './gallery_reducer';

const rootReducer = combineReducers({
  user,
  products,
  items
});

export default rootReducer;
