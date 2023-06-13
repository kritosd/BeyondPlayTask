import app from '../app';
import request from 'supertest';

const baseURL = '/api/statuses';

describe('GET /api/teams', () => {
    it('returns a list of teams', async () => {
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