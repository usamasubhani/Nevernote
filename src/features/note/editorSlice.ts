import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces/note.interface';

interface EditorState {
  canEdit: boolean;
  currentlyEditing: Note | null;
  activeNotebookId: string | null;
}

const initialState: EditorState = {
  canEdit: false,
  currentlyEditing: null,
  activeNotebookId: null,
};

const editor = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCanEdit(state, { payload }: PayloadAction<boolean>) {
      state.canEdit = payload != null ? payload : !state.canEdit;
    },
    setCurrentlyEditing(state, { payload }: PayloadAction<Note | null>) {
      state.currentlyEditing = payload;
    },
    setActiveNotebookId(state, { payload }: PayloadAction<string>) {
      state.activeNotebookId = payload;
    },
  },
});

export const { setCanEdit, setCurrentlyEditing, setActiveNotebookId } = editor.actions;
export default editor.reducer;
