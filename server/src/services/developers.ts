import db from '../models';
import { IDeveloper, IDeveloperReq } from '../Interfaces/IDeveloper';

export const findAll = async (): Promise<IDeveloper[]> => {
    return await db.Developer.findAll({ attributes: ['id', 'name', 'email'], include: [db.Role, db.Status, db.Team] });
};

export const find = async (id: string): Promise<IDeveloper | any> => {
    return await db.Developer.findByPk(id, { attributes: ['id', 'name', 'email'], include: [db.Role, db.Status, db.Team] });
};

export const create = async (developer: IDeveloperReq): Promise<IDeveloper | any> => {
    return await db.Developer.create(developer, { attributes: ['id', 'name', 'email'], include: [db.Role, db.Status, db.Team] });
};

export const update = async (id: string, developerUpdate: IDeveloperReq): Promise<number | any> => {
    return await db.Developer.update(developerUpdate, { where: { id: id } });
};

export const remove = async (id: string): Promise<IDeveloper | any> => {
    return await db.Developer.destroy({ where: { id: id } });
};

const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const isEmailValid = (email: string): boolean => {
    if (!email) {
        return false;
    }

    var valid = emailRegex.test(email);
    if(!valid) {
        return false;
    }

    return true;
};