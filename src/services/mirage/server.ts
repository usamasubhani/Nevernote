import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';

import user from './routes/user';
import * as notebook from './routes/notebook';

export const handleErrors = (error: any, message = 'ERROR!') => {
    return new Response(400, undefined, {
        data: {
            message,
            isError: true,
        },
    });
};

export const setupServer = (env?: string): Server => {
    return new Server({
        environment: env ?? 'development',

        models: {
            note: Model.extend({
                notebook: belongsTo(),
            }),
            notebook: Model.extend({
                note: hasMany(),
                user: belongsTo(),
            }),
            user: Model.extend({
                notebook: hasMany(),
            }),
        },

        factories: {
            user: Factory.extend({
                username: 'test',
                password: 'password',
                email: 'test@email.com',
            }),
        },

        seeds: (server): any => {
            server.create('user');
        },

        routes(): void {
            this.urlPrefix = 'https://notes.app';

            this.get('/notebooks/notes/:id', notebook.getEntries);
            this.get('/notebooks/:id', notebook.getDiaries);

            this.post('/auth/login', user.login);
            this.post('/auth/signup', user.signup);

            this.post('/notebooks/', notebook.create);
            this.post('/notebooks/note/:id', notebook.addNote);

            this.put('/notebooks/note/:id', notebook.updateNote);
            this.put('/notebooks/:id', notebook.updateNotebook);
        },
    });
};