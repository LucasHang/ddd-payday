import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import CreateAccountUseCase from './CreateAccountUseCase';

const createAccountUseCase = new CreateAccountUseCase(new FakeAccountRepository(), new FakeUserRepository());

export { createAccountUseCase };
