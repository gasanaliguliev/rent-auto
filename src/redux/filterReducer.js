import { createSlice } from '@reduxjs/toolkit';
import { changeFilter } from './filterOperations';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  extraReducers: builder =>
    builder.addCase(changeFilter.fulfilled, (state, { payload }) => {
      state.filter = payload;
    }),
});

export const filterReducer = filterSlice.reducer;