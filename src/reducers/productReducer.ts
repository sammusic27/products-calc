import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { stateDATA, singleActions } from "./helper";

const initialState: any = cloneDeep(stateDATA);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: singleActions
});

export const { pending, failure, completed } = productSlice.actions;
export default productSlice.reducer;
