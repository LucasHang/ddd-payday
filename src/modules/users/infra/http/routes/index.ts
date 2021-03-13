import { createUserController } from '@modules/users/useCases/createUser';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', async (req, res) => createUserController.execute(req, res));

export default userRouter;
