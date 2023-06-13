import app from '../app';
import request from 'supertest';
import { IRandomize, IRandomizeResp, Orders } from '../Interfaces/IRandomize';
import { IDeveloper } from '../Interfaces/IDeveloper';

const baseURL = '/api/randomize';
const developerURL = '/api/developers';


describe("POST /api/randomize", () => {
    // set up the randomizeOptions
    const randomizeOptions: IRandomize = {
        developers: [],
        order: Orders.Random,
        speaker: ''
    };
    let allDevelopers: IDeveloper[] = [];

    beforeAll(async () => {
        const response = await request(app).get(developerURL);
        allDevelopers = response.body;
    });


    it("randomize - should return 200", async () => {
        randomizeOptions.developers = allDevelopers.map((d) => d.id);
        const response = await request(app).post(`${baseURL}`).send(randomizeOptions);
        const randomizeResponse: IRandomizeResp = response.body;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([]));
        expect(randomizeResponse.developers.length).toBe(allDevelopers.length);
        expect(randomizeResponse.speaker).toEqual(expect.objectContaining({}))
    });
    
});