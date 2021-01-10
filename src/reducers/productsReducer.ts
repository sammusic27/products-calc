import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import { stateRows, rowsActions } from "./helper";

const initialState: any = cloneDeep(stateRows);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: rowsActions
});

export const { pending, failure, completed } = productsSlice.actions;
export default productsSlice.reducer;
