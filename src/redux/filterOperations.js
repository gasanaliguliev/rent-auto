import { createAsyncThunk } from '@reduxjs/toolkit';

export const changeFilter = createAsyncThunk(
  'filter/makeFilter',
  async ({ value }, { rejectWithValue }) => {
    try {
      console.log(value);
      return value;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);