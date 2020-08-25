import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/auth/userSlice';
import notebooksReducer from './features/notebook/notebooksSlice'
import notesReducer from './features/note/notesSlice'
import editorReducer from './features/note/editorSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  diaries: notebooksReducer,
  entries: notesReducer,
  user: userReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
