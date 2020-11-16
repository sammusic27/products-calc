import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { products } from '../../data/data';
import {parseProductList} from "../utils/productHelper";

const initialState = cloneDeep(parseProductList(products));

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}
})

export default productSlice.reducer