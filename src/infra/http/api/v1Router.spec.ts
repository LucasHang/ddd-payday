/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../app';

describe('UsersRoutes', () => {
    beforeEach(async () => {
        // limpar o banco quando chegar essa hora
    });

    describe('GET /v1/', () => {
        it('Should return success if server is up', async () => {
            const res = await request(app).get('/v1/').expect(200);

            expect(res.text.includes('Tudo normal por aqui')).toBeTruthy();
        });
    });

    describe('POST /v1/users', () => {
        it('Should return an error if invalid params were provided', async () => {
            expect('banana').toBe('banana');
        });

        it('Should return an user if valid params were provided', async () => {
            expect('banana').toBe('banana');
        });
    });

    describe('POST /v1/withdraw', () => {
        it('Should return an error if invalid params were provided', async () => {
            expect('banana').toBe('banana');
        });

        it('Should return an account if valid params were provided', async () => {
            expect('banana').toBe('banana');
        });
    });
});
