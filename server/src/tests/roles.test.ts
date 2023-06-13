import app from '../app';
import request from 'supertest';
import { IRoles } from '../Interfaces/IRoles';

const baseURL = '/api/roles';

describe('GET /api/roles', () => {
    it('returns a list of roles', async () => {
        return request(app)
            .get(baseURL)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.arrayContaining([])
                );
            });
    });

    it('When path not found', async () => {
        const res = await request(app).get(`${baseURL}WHATEVER`);
        expect(res.statusCode).toBe(404);
    });
});