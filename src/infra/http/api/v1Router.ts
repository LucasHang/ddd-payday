import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes';
import accountsRouter from '@modules/accounts/infra/http/routes';

const v1Router = Router();

v1Router.get('/', (_req, res) => {
    return res.send(`Tudo normal por aqui - ${new Date()}`);
});

v1Router.use('/users', usersRouter);
v1Router.use('/accounts', accountsRouter);

export default v1Router;
