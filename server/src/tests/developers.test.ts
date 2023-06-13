import app from '../app';
import request from 'supertest';
import { IDeveloper, IDeveloperReq } from '../Interfaces/IDeveloper';

const baseURL = '/api/developers';


describe("GET /api/developers", () => {
    // set up the developer
    const Developer: IDeveloperReq = {
        name: 'test',
        email: `test@test.com`,
        RoleId: 1,
        StatusId: 1,
        TeamId: 1
    };
    let developerCreated: any;

    beforeAll(async () => {
        const response = await request(app).post(baseURL).send(Developer);
        developerCreated = response.body;
        expect(developerCreated.email).toBe(Developer.email);
    })

    afterAll(async () => {
        const response = await request(app).delete(`${baseURL}/${developerCreated.id}`);
        expect(response.statusCode).toBe(204);
    });

    it("get developers - should return 200", async () => {
        const response = await request(app).get(baseURL);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
            expect.arrayContaining([])
        );
    });
    
    it("update developer - should return 200", async () => {
        developerCreated.email = 'testUpdated@gmail.com';
        developerCreated.RoleId = 2;
        developerCreated.TeamId = 3;
        const response = await request(app).put(`${baseURL}/${developerCreated.id}`);
        expect(response.statusCode).toBe(200);
    });
});