import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    name: '',
    values: {}
  },
  reducers: {
    show: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        values: {
          ...action.payload.props
        }
      };
    },
    hide: state => {
      return {
        ...state,
        name: '',
        values: {}
      };
    },
  }
})

export const { show, hide } = modalSlice.actions;

export default modalSlice.reducer