class Teste {}

describe('Teste', () => {
    it('should work', () => {
        expect(new Teste()).toBeInstanceOf(Teste);
    });
});
