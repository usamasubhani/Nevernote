import React, { FC, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import http from '../../services/api';
import { Note } from '../../interfaces/note.interface';
import { setNotes } from '../note/notesSlice';
import { setCurrentlyEditing, setCanEdit } from '../note/editorSlice';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../store';

const NotebookList: FC = () => {
  const { notes } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { notes: Note[] }>(`/notebooks/notes/${id}`)
        .then(({ notes: _notes }) => {
          if (_notes) {
            const sortByLastUpdated = _notes.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setNotes(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="notes">
      <header>
        <Link to="/">
          <h3>Back</h3>
        </Link>
      </header>
      <ul>
        {notes.map((note:any) => (
          <li
            key={note.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(note));
              dispatch(setCanEdit(true));
            }}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotebookList;
