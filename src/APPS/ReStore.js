import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../FEATURES/Notes/NotesSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
