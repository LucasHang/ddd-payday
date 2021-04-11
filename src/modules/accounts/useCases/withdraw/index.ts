import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import MyDtoValidator from '@shared/validators/implementations/MyDtoValidator';
import WithdrawUseCase from './WithdrawUseCase';
import WithdrawDTOValidation from './WithdrawDTOValidation';
import WithdrawController from './WithdrawController';

const withDrawUseCase = new WithdrawUseCase(
    new FakeAccountRepository(),
    new MyDtoValidator(WithdrawDTOValidation),
);

const withdrawController = new WithdrawController(withDrawUseCase);

export { withDrawUseCase, withdrawController };
