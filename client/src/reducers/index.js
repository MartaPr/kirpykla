import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './product_reducer';
import gallery from './gallery_reducer';

const rootReducer = combineReducers({
  user,
  products,
  gallery,
});

export default rootReducer;
