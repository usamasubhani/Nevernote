import { Response, Request } from 'miragejs';
import { handleErrors } from '../server';
import { Notebook } from '../../../interfaces/notebook.interface'
import { Note } from '../../../interfaces/note.interface';
import dayjs from 'dayjs';
import { User } from '../../../interfaces/user.interface';


export const create = (
    schema: any,
    req: Request
  ): { user: User; notebook: Notebook } | Response => {
    try {
      const { title, type, userId } = JSON.parse(req.requestBody) as Partial<
        Notebook
      >;
      const exUser = schema.users.findBy({ id: userId });
      if (!exUser) {
        return handleErrors(null, 'No such user exists.');
      }
      const now = dayjs().format();
      const notebook = exUser.createNotebook({
        title,
        type,
        createdAt: now,
        updatedAt: now,
      });
      return {
        user: {
          ...exUser.attrs,
        },
        notebook: notebook.attrs,
      };
    } catch (error) {
      return handleErrors(error, 'Failed to create Notebook.');
    }
  };
  
  export const updateNotebook = (schema: any, req: Request): Notebook | Response => {
    try {
      const notebook = schema.notebooks.find(req.params.id);
      const data = JSON.parse(req.requestBody) as Partial<Notebook>;
      const now = dayjs().format();
      notebook.update({
        ...data,
        updatedAt: now,
      });
      return notebook.attrs as Notebook;
    } catch (error) {
      return handleErrors(error, 'Failed to update Notebook.');
    }
  };
  
  export const getDiaries = (schema: any, req: Request): Notebook[] | Response => {
    try {
      const user = schema.users.find(req.params.id);
      return user.notebook as Notebook[];
    } catch (error) {
      return handleErrors(error, 'Could not get user diaries.');
    }
  };

  export const addNote = (
    schema: any,
    req: Request
  ): { notebook: Notebook; note: Note } | Response => {
    try {
      const notebook = schema.notebooks.find(req.params.id);
      const { title, content } = JSON.parse(req.requestBody) as Partial<Note>;
      const now = dayjs().format();
      const note = notebook.createNote({
        title,
        content,
        createdAt: now,
        updatedAt: now,
      });
      notebook.update({
        ...notebook.attrs,
        updatedAt: now,
      });
      return {
        notebook: notebook.attrs,
        note: note.attrs,
      };
    } catch (error) {
      return handleErrors(error, 'Failed to save note.');
    }
  };
  
  export const getEntries = (
    schema: any,
    req: Request
  ): { entries: Note[] } | Response => {
    try {
      const notebook = schema.notebooks.find(req.params.id);
      return notebook.note;
    } catch (error) {
      return handleErrors(error, 'Failed to get Notebook entries.');
    }
  };
  
  export const updateNote = (schema: any, req: Request): Note | Response => {
    try {
      const note = schema.notes.find(req.params.id);
      const data = JSON.parse(req.requestBody) as Partial<Note>;
      const now = dayjs().format();
      note.update({
        ...data,
        updatedAt: now,
      });
      return note.attrs as Note;
    } catch (error) {
      return handleErrors(error, 'Failed to update note.');
    }
  };
  
  