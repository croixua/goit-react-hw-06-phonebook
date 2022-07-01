import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const contactAdd = createAction('items/add', (name, number) => ({
  payload: {
    id: nanoid(),
    name,
    number,
  },
}));

export const contactLoading = createAction('items/loading');

export const contactDelete = createAction('items/delete');

export const changeFilter = createAction('filter/change');
