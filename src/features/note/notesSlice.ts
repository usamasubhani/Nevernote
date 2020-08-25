import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces/note.interface';

const notes = createSlice({
  name: 'notes',
  initialState: [] as Note[],
  reducers: {
    setNotes(state, { payload }: PayloadAction<Note[] | null>) {
      return (state = payload != null ? payload : []);
    },
    updateNote(state, { payload }: PayloadAction<Note>) {
      const { id } = payload;
      const index = state.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.splice(index, 1, payload);
      }
    },
  },
});

export const { setNotes, updateNote } = notes.actions;
export default notes.reducer;
