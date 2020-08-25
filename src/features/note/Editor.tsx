import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import Markdown from 'markdown-to-jsx';
import http from '../../services/api';
import { Note } from '../../interfaces/note.interface';
import { Notebook } from '../../interfaces/notebook.interface';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { updateNotebook } from '../notebook/notebooksSlice';
import { updateNote } from './notesSlice';
import { showAlert } from '../../utils';
import { useAppDispatch } from '../../store';

const Editor: FC = () => {
  const { currentlyEditing: note, canEdit, activeNotebookId } = useSelector(
    (state: RootState) => state.editor
  );
  const [editedNote, updateEditedNote] = useState(note);
  const dispatch = useAppDispatch();

  const saveNote = async () => {
    console.log(activeNotebookId)
    console.log(note)
    if (activeNotebookId == null) {
      return showAlert('Please select a notebook.', 'warning');
    }
    if (note == null) {
      http
        .post<Note, { notebook: Notebook; note: Note }>(
          `/notebooks/note/${activeNotebookId}`,
          editedNote
        )
        .then((data) => {
          if (data != null) {
            const { notebook, note: _note } = data;
            dispatch(setCurrentlyEditing(_note));
            dispatch(updateNotebook(notebook));
          }
        });
    } else {
      http
        .put<Note, Note>(`notebooks/note/${note.id}`, editedNote)
        .then((_note) => {
          if (_note != null) {
            dispatch(setCurrentlyEditing(_note));
            dispatch(updateNote(_note));
          }
        });
    }
    dispatch(setCanEdit(false));
  };

  useEffect(() => {
    updateEditedNote(note);
  }, [note]);

  return (
    <div className="editor">
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '0.2em',
          paddingBottom: '0.2em',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        {note && !canEdit ? (
          <h4>
            {note.title}
            <a
              href="#edit"
              onClick={(e) => {
                e.preventDefault();
                if (note != null) {
                  dispatch(setCanEdit(true));
                }
              }}
              style={{ marginLeft: '0.4em' }}
            >
              (Edit)
            </a>
          </h4>
        ) : (
          <input
            value={editedNote?.title ?? ''}
            disabled={!canEdit}
            onChange={(e) => {
              if (editedNote) {
                updateEditedNote({
                  ...editedNote,
                  title: e.target.value,
                });
              } else {
                updateEditedNote({
                  title: e.target.value,
                  content: '',
                });
              }
            }}
          />
        )}
      </header>
      {note && !canEdit ? (
        <Markdown>{note.content}</Markdown>
      ) : (
        <>
          <textarea
            disabled={!canEdit}
            placeholder="Supports markdown!"
            value={editedNote?.content ?? ''}
            onChange={(e) => {
              if (editedNote) {
                updateEditedNote({
                  ...editedNote,
                  content: e.target.value,
                });
              } else {
                updateEditedNote({
                  title: '',
                  content: e.target.value,
                });
              }
            }}
          />
          <button onClick={saveNote} disabled={!canEdit}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default Editor;
