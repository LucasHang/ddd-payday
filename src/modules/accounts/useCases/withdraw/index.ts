import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import MyDtoValidator from '@shared/validators/implementations/MyDtoValidator';
import WithdrawUseCase from './WithdrawUseCase';
import WithdrawDTOValidation from './WithdrawDTOValidation';

const withDrawUseCase = new WithdrawUseCase(
    new FakeAccountRepository(),
    new MyDtoValidator(WithdrawDTOValidation),
);

export { withDrawUseCase };
