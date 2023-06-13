import express, { Request, Response } from 'express';
import * as RolesService from '../services/roles';
import { IRoles } from '../Interfaces/IRoles';

export const rolesRouter = express.Router();

rolesRouter.get('/', async (req: Request, res: Response) => {
    try {
        const roles: IRoles[] = await RolesService.findAll();

        res.status(200).send(roles);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});