import db from '../models';
import { IRandomize, IRandomizeResp, Orders } from '../Interfaces/IRandomize';
import { IDeveloper } from '../Interfaces/IDeveloper';

export const calculate = async (randomizeReq: IRandomize): Promise<IRandomizeResp> => {
    let devs: IDeveloper[] = await getDevelopers(randomizeReq.developers);
    const resp: IRandomizeResp = {
        developers: orderDevelopers(devs, randomizeReq.order),
        speaker: randomizeReq.speaker ? assignSpeaker(devs, randomizeReq.speaker) : assignRandomSpeaker(devs)
    };
    return resp;
};

const getDevelopers = async (ids: string[]): Promise<IDeveloper[]> => {
    return await db.Developer.findAll({ attributes: ['id', 'name', 'email'], include: [db.Role, db.Status, db.Team], where: { id: ids } });
};

const orderDevelopers = (developers: IDeveloper[], order: Orders): IDeveloper[] => {
    if (order === Orders.Random) {
        return getRandomOrder(developers);
    } else {
        return getAlphabeticalOrder(developers);
    }
};

const getRandomOrder = (developers: IDeveloper[]): IDeveloper[] => {
    return developers.sort(function (a, b) {
        return Math.random() - 0.5;
    });
};

const getAlphabeticalOrder = (developers: IDeveloper[]): IDeveloper[] => {
    return developers.sort((a, b) => a.name.localeCompare(b.name));
};

const assignRandomSpeaker = (developers: IDeveloper[]): IDeveloper => {
    return developers[Math.floor(Math.random()*developers.length)];
};

const assignSpeaker = (developers: IDeveloper[], speakerId: string): IDeveloper => {
    const foundDevIndex = developers.findIndex(d => d.id === speakerId)
    console.log(foundDevIndex);
    if (foundDevIndex > 0) {
        return developers[foundDevIndex];
    } else {
        return assignRandomSpeaker(developers);
    }
};