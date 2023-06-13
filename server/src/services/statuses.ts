import db from '../models';
import { IStatus } from '../Interfaces/IStatus';

export const findAll = async (): Promise<IStatus[]> => {
    let data: IStatus[] = [];
    await db.Status.findAll().then((result: IStatus[]) => data = result).catch((err: object) => console.log(err));
    return data;
};