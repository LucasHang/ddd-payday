import FakeUserRepository from '@modules/users/repositories/implementatios/fake/fakeUserRepository';
import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

const createUserUseCase = new CreateUserUseCase(new FakeUserRepository());

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
