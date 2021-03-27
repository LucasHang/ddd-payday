import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import MyClassValidator from '@shared/validators/implementations/MyClassValidator';
import WithdrawDTO from './WithdrawDTO';
import WithdrawUseCase from './WithdrawUseCase';

const withDrawUseCase = new WithdrawUseCase(
    new FakeAccountRepository(),
    new MyClassValidator(() => new WithdrawDTO()),
);

export { withDrawUseCase };
