import { combineReducers } from 'redux'

import productsReducer from './productsReducer';
import productReducer from './productReducer';
import modalReducer from './modal';

export const rootReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  modal: modalReducer,
});