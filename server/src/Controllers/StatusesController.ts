import express, { Request, Response } from 'express';
import * as StatusesService from '../services/statuses';
import { IStatus } from '../Interfaces/IStatus';

export const statusesRouter = express.Router();

statusesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const statuses: IStatus[] = await StatusesService.findAll();

        res.status(200).send(statuses);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});