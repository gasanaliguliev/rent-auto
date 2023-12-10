import { createSlice } from '@reduxjs/toolkit';
import {
  addToFavorite,
  getCars,
  loadMore,
  removeFromFavorite,
} from './operations';
import { toast } from 'react-toastify';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    favorite: [],
    carId: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getCars.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: payload,
          isLoading: false,
        };
      })
      .addCase(getCars.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCars.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(addToFavorite.fulfilled, (state, { payload }) => {
        state.favorite.push(payload);
        state.carId.push(payload.id);
        toast.success('Car success added to favorite');
      })
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        const index = state.favorite.findIndex(car => car.id === payload);
        state.favorite.splice(index, 1);
        state.carId.splice(index, 1);
        toast.success('Car success remove from favorite');
      })
      .addCase(loadMore.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      });
  },
});

export const carsReducer = carsSlice.reducer;