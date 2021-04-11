import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import MyDtoValidator from '@shared/validators/implementations/MyDtoValidator';
import DepositUseCase from './DepositUseCase';
import DepositDTOValidation from './DepositDTOValidation';

const depositUseCase = new DepositUseCase(
    new FakeAccountRepository(),
    new MyDtoValidator(DepositDTOValidation),
);

export { depositUseCase };
