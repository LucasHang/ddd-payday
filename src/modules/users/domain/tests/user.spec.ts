/* eslint-disable no-use-before-define */
import UniqueEntityID from '@core/domain/UniqueEntityID';
import faker from 'faker';
import User from '../user';
import UserEmail from '../userEmail';
import UserPassword from '../userPassword';

describe('User domain', () => {
    it('Should create a user with the given props plus the default setted ones', async () => {
        const password = faker.internet.password();
        const email = faker.internet.email();

        const { userToCreate, userDefaultProps } = await generateUserMocks({
            password,
            email,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userOrError = User.create(userToCreate as any);

        expect(userOrError.isRight()).toBeTruthy();

        if (!userOrError.isRight()) return;

        const userDomain = userOrError.value;

        expect(userDomain).toMatchObject({ ...userToCreate, ...userDefaultProps });
        expect(userDomain.id).toBeInstanceOf(UniqueEntityID);
        expect(userDomain.password).toBeInstanceOf(UserPassword);
        expect(userDomain.email).toBeInstanceOf(UserEmail);
        expect(userDomain.createdAt).toBeInstanceOf(Date);
        expect(userDomain.updatedAt).toBeInstanceOf(Date);

        const isPasswordEqual = await userDomain.password.comparePassword(password);
        expect(isPasswordEqual).toBeTruthy();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isEmailEqual = userDomain.email.equals(UserEmail.build(email).value as any);
        expect(isEmailEqual).toBeTruthy();
    });

    it('Should return error when required props were not present', async () => {
        const { userToCreate } = await generateUserMocks({ overwriteProps: { name: null } });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userOrError = User.create(userToCreate as any);

        expect(userOrError.isLeft()).toBeTruthy();

        if (!userOrError.isLeft()) return;

        expect(userOrError.value).toEqual("'Nome' deve ser informado(a)");
    });

    it('Should build a user with the given props', async () => {
        const { userToCreate, userDefaultProps } = await generateUserMocks();

        const user = { ...userToCreate, ...userDefaultProps, createdAt: new Date(), updatedAt: new Date() };
        const userId = new UniqueEntityID();

        const userOrError = User.build(user, userId);

        expect(userOrError.isRight()).toBeTruthy();

        if (!userOrError.isRight()) return;

        const userDomain = userOrError.value;

        expect(userDomain).toMatchObject(user);
        expect(userDomain.id).toEqual(userId);
    });
});

async function generateUserMocks(params?: { password?: string; email?: string; overwriteProps?: any }) {
    const passwordOrError = await UserPassword.create(params?.password || faker.internet.password());
    const emailOrError = UserEmail.create(params?.email || faker.internet.email());

    const userToCreate = {
        name: faker.name.findName(),
        email: emailOrError.value,
        age: faker.random.number(100),
        password: passwordOrError.value,
        ...params?.overwriteProps,
    };

    const userDefaultProps = {
        isDeleted: false,
    };

    return { userToCreate, userDefaultProps };
}
