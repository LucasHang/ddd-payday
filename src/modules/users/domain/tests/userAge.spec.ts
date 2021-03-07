import UserAge from '../userAge';

describe('UserAge domain', () => {
    it(`Should return error when age is lesser than ${UserAge.minAge}`, () => {
        const ageOrError = UserAge.create(UserAge.minAge - 1);

        expect(ageOrError.isLeft()).toBeTruthy();
        if (!ageOrError.isLeft()) return;
        expect(ageOrError.value).toEqual(`Idade deve ser no mínimo ${UserAge.minAge} anos`);
    });
});
