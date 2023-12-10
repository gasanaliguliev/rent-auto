import { persistStore, persistReducer } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './reducer';
import { filterReducer } from './filterReducer';

const carsPersistConfig = {
  key: 'cars',
  storage,
  whitelist: ['favorite', 'carId'],
};

export const store = configureStore({
  reducer: {
    cars: persistReducer(carsPersistConfig, carsReducer),
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);