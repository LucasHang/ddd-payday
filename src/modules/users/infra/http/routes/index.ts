import { createUserController } from '@modules/users/useCases/createUser';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => createUserController.execute(req, res));

export default usersRouter;
