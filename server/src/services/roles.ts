import db from '../models';
import { RoleAttributes } from '../models/Role';

export const findAll = async (): Promise<RoleAttributes[]> => {
    let data: RoleAttributes[] = [];
    await db.Role.findAll().then((result: RoleAttributes[]) => data = result).catch((err: object) => console.log(err));
    return data;
};