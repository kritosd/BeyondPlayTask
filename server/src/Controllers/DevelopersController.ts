import express, { Request, Response } from 'express';
import * as DevelopersService from '../services/developers';
import { IDeveloper, IDeveloperReq } from '../Interfaces/IDeveloper';

export const developersRouter = express.Router();

developersRouter.get('/', async (req: Request, res: Response) => {
    try {
        const developers: IDeveloper[] = await DevelopersService.findAll();

        res.status(200).send(developers);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

developersRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const developer: IDeveloper = await DevelopersService.find(id);

        if (developer) {
            return res.status(200).send(developer);
        }
        
        res.status(404).send('developer not found');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

developersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const developer: IDeveloperReq = req.body;
        const isEmailValid: boolean = DevelopersService.isEmailValid(developer.email);
        if (!isEmailValid) {
            return res.status(400).send('Wrong email');
        }
        const newDeveloper: IDeveloperReq = await DevelopersService.create(developer);

        return res.status(201).json(newDeveloper);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


developersRouter.put('/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const developer: IDeveloperReq = req.body;

        const result = await DevelopersService.update(id, developer);
        if (result.length) {
            return res.status(200).send('Developer updated');
        }
        
        res.status(500).send('something went wrong');
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

developersRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        const result = await DevelopersService.remove(id);
        if (result) {
            return res.status(204).send('developer deleted');
        }

        return res.status(204);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});