import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import ClassValidator from '@shared/validators/implementations/ClassValidator';
import WithdrawDTO from './WithdrawDTO';
import WithdrawUseCase from './WithdrawUseCase';

const withDrawUseCase = new WithdrawUseCase(new FakeAccountRepository(), new ClassValidator(WithdrawDTO));

export { withDrawUseCase };
