import express, { Request, Response } from 'express';
import * as TeamsService from '../services/teams';
import { ITeams } from '../Interfaces/ITeams';

export const teamsRouter = express.Router();

teamsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams: ITeams[] = await TeamsService.findAll();

        res.status(200).send(teams);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});