import React, { FC, useState } from 'react';
import { Notebook } from '../../interfaces/notebook.interface';
import http from '../../services/api';
import { updateNotebook } from './notebooksSlice';
import { setCanEdit, setActiveNotebookId, setCurrentlyEditing } from '../note/editorSlice';
import { showAlert } from '../../utils';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';

interface Props {
  notebook: Notebook;
}

const NotebookTile: FC<Props> = (props) => {
  const [notebook, setNotebook] = useState(props.notebook);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const totalEntries = props.notebook?.noteIds?.length;

  const saveChanges = () => {
    http
      .put<Notebook, Notebook>(`/diaries/${notebook.id}`, notebook)
      .then((notebook) => {
        if (notebook) {
          dispatch(updateNotebook(notebook));
          showAlert('Saved!', 'success');
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="notebook-tile list-group-item off-white">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: 'pointer',
        }}
      >
        {isEditing ? (
          <input
            value={notebook.title}
            onChange={(e) => {
              setNotebook({
                ...notebook,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{notebook.title}</span>
        )}
      </h2>
      <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
      <div style={{ display: 'flex' }}>
        <button
          className="btn btn-secondary off-white"
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveNotebookId(notebook.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add
        </button>
        <Link to={`notebook/${notebook.id}`} >
          <button className="btn btn-secondary off-white">
            View all
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotebookTile;
