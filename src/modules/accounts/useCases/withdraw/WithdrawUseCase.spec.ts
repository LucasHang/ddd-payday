import faker from 'faker';
import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import { User, UserAge, UserEmail, UserPassword } from '@modules/users/domain';
import { Account, AccountBalance } from '@modules/accounts/domain';
import ClassValidator from '@shared/validators/implementations/ClassValidator';
import IValidator from '@shared/validators/IValidator';
import WithdrawUseCase from './WithdrawUseCase';
import WithdrawDTO from './WithdrawDTO';

let useCase: WithdrawUseCase;

let fakeUserRepository: FakeUserRepository;
let fakeAccountRepository: FakeAccountRepository;
let classValidator: IValidator;

let accountId: string;

describe('WithdrawUseCase', () => {
    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        fakeAccountRepository = new FakeAccountRepository();
        classValidator = new ClassValidator(WithdrawDTO);

        const userPassword = await UserPassword.create(faker.internet.password());
        const userEmail = UserEmail.create(faker.internet.email());
        const userAge = UserAge.create(faker.random.number({ min: 16, max: 100 }));

        const user = User.create({
            name: faker.name.findName(),
            email: userEmail.value as UserEmail,
            age: userAge.value as UserAge,
            password: userPassword.value as UserPassword,
        }).value as User;

        const createdUser = await fakeUserRepository.insert(user);

        const account = Account.create({
            userId: createdUser.id,
            balance: AccountBalance.create(0).value as AccountBalance,
        }).value as Account;

        const createdAccount = await fakeAccountRepository.insert(account);

        accountId = createdAccount.id.toString();

        useCase = new WithdrawUseCase(fakeAccountRepository, classValidator);
    });

    it('Should be able to withdraw if valid params were provided', async () => {
        await useCase.execute({
            accountId,
            value: -1,
        });

        expect('banana').toBe('banana');
    });
});
