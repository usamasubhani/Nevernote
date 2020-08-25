import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notebook } from '../../interfaces/notebook.interface';

const notebooks = createSlice({
  name: 'notebooks',
  initialState: [] as Notebook[],
  reducers: {
    addNotebook(state, { payload }: PayloadAction<Notebook[]>) {
      const notebooksToSave = payload.filter((notebook) => {
        return state.findIndex((item) => item.id === notebook.id) === -1;
      });
      state.push(...notebooksToSave);
    },
    updateNotebook(state, { payload }: PayloadAction<Notebook>) {
      const { id } = payload;
      const notebookIndex = state.findIndex((notebook) => notebook.id === id);
      if (notebookIndex !== -1) {
        state.splice(notebookIndex, 1, payload);
      }
    },
  },
});

export const { addNotebook, updateNotebook } = notebooks.actions;
export default notebooks.reducer;
