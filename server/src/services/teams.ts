import db from '../models';
import { ITeams } from '../Interfaces/ITeams';

export const findAll = async (): Promise<ITeams[]> => {
    let data: ITeams[] = [];
    await db.Team.findAll().then((result: ITeams[]) => data = result).catch((err: object) => console.log(err));
    return data;
};