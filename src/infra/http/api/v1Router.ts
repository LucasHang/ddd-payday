import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes';

const v1Router = Router();

v1Router.get('/', (req, res) => {
    return res.send(`Tudo normal por aqui - ${new Date()}`);
});

v1Router.use('/users', usersRouter);

export default v1Router;
