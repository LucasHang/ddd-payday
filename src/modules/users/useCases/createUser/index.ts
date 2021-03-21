import { createAccountUseCase } from '@modules/accounts/useCases/createAccount';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

const createUserUseCase = new CreateUserUseCase(new FakeUserRepository(), createAccountUseCase);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
