import { configureStore } from '@reduxjs/toolkit';
import reducers from './phonebook/phonebook-reducer';

export const store = configureStore({
  reducer: { contacts: reducers },
});
