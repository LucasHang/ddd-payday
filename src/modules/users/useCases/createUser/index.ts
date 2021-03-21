import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

const createUserUseCase = new CreateUserUseCase(new FakeUserRepository(), new FakeAccountRepository());

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
