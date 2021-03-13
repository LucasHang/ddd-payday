import FakeUserRepository from '@modules/users/repositories/implementatios/fake/fakeUserRepository';
import faker from 'faker';
import CreateUserDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';

let useCase: CreateUserUseCase;

let fakeUserRepository: FakeUserRepository;

describe('CreateUserUseCase', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        useCase = new CreateUserUseCase(fakeUserRepository);
    });

    it('Should be able to create an user', async () => {
        const toCreateUser: CreateUserDTO = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: 19,
            password: faker.internet.password(),
        };

        const createdUserOrError = await useCase.execute(toCreateUser);

        expect(createdUserOrError.isRight()).toBeTruthy();

        if (!createdUserOrError.isRight()) return;

        const user = createdUserOrError.value;

        expect(user.id).toBeTruthy();
        expect(user.createdAt).toBeTruthy();
        expect(user.email).toEqual(toCreateUser.email);
    });
});
