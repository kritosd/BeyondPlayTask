import express, { Request, Response } from 'express';
import * as RandomizeService from '../services/randomize';
import { IRandomize, IRandomizeResp } from '../Interfaces/IRandomize';

export const randomizeRouter = express.Router();

randomizeRouter.post('/', async (req: Request, res: Response) => {
    try {
        const randomizeReq: IRandomize = req.body;
        const resp: IRandomizeResp = await RandomizeService.calculate(randomizeReq);
        res.status(200).send(resp);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});