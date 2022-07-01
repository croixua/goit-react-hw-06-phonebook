import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  contactLoading,
  contactAdd,
  contactDelete,
  changeFilter,
} from './phonebook-actions';

const items = createReducer([], {
  [contactLoading]: (state, { payload }) => [...state, ...payload],
  [contactAdd]: (state, { payload }) => [...state, payload],
  [contactDelete]: (_, { payload }) => [...payload],
});
const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
