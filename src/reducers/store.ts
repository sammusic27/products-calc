import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsReducer';

export default configureStore({
  reducer: {
    products: productsReducer
  }
})
