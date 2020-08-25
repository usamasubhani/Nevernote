import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import http from '../../services/api';
import { Notebook } from '../../interfaces/notebook.interface';
import { addNotebook } from './notebooksSlice';
import Swal from 'sweetalert2';
import { setUser } from '../auth/userSlice';
import NotebookTile from './Notebook';
import { User } from '../../interfaces/user.interface';
import { Route, Switch } from 'react-router-dom';
import NotebookNotesList from './NotebookList';
import { useAppDispatch } from '../../store';
import dayjs from 'dayjs';

const Diaries: FC = () => {
  const dispatch = useAppDispatch();
  const notebooks = useSelector((state: RootState) => state.notebooks);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Notebook[]>(`notebooks/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addNotebook(sortedByUpdatedAt));
          }
        });
      }
    };
    fetchDiaries();
  }, [dispatch, user]);

  const createNotebook = async () => {
    const result : any = await Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    }).queue([
      {
        titleText: 'Notebook title',
        input: 'text',
      },
      {
        titleText: 'Private or public?',
        input: 'radio',
        inputOptions: {
          private: 'Private',
          public: 'Public',
        },
        inputValue: 'private',
      },
    ]);
    if (result.value) {
      const { value } = result;
      const {
        notebook,
        user: _user,
      } = await http.post<Partial<Notebook>, { notebook: Notebook; user: User }>('/notebooks/', {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });
      if (notebook && user) {
        dispatch(addNotebook([notebook] as Notebook[]));
        dispatch(addNotebook([notebook] as Notebook[]));
        dispatch(setUser(_user));
        return Swal.fire({
          titleText: 'Notebook created!',
          confirmButtonText: 'OK',
          
        });
      }
    }
    Swal.fire({
      titleText: 'Cancelled',
    });
  };

  return (
    <div className="m-5">
      <Switch>
        <Route path="/notebook/:id">
          <NotebookNotesList />
        </Route>
        <Route path="/">
          <button className="btn btn-outline-primary btn-block mb-2" onClick={createNotebook}>Create New Notebook</button>
          <div className="list-group">
          {notebooks.map((notebook, idx) => (
            <NotebookTile key={idx} notebook={notebook} />
          ))}
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Diaries;
