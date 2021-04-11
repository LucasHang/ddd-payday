import { withdrawController } from '@modules/accounts/useCases/withdraw';
import { depositController } from '@modules/accounts/useCases/deposit';
import { Router } from 'express';

const accountsRouter = Router();

accountsRouter.put('/:accountId/withdraw', async (req, res) => withdrawController.execute(req, res));
accountsRouter.put('/:accountId/deposit', async (req, res) => depositController.execute(req, res));

export default accountsRouter;
