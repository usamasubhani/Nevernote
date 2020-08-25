import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces/note.interface';

interface EditorState {
  canEdit: boolean;
  currentlyEditing: Note | null;
  activeDiaryId: string | null;
}

const initialState: EditorState = {
  canEdit: false,
  currentlyEditing: null,
  activeDiaryId: null,
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
    setActiveDiaryId(state, { payload }: PayloadAction<string>) {
      state.activeDiaryId = payload;
    },
  },
});

export const { setCanEdit, setCurrentlyEditing, setActiveDiaryId } = editor.actions;
export default editor.reducer;
