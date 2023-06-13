import { IDeveloper } from "./IDeveloper";

export interface IRandomize {
    developers: string[];
    order: Orders;
    speaker?: string;
};

export interface IRandomizeResp {
    developers: IDeveloper[];
    speaker: IDeveloper;
};

export enum Orders {
    Random = 'Random',
    Alphabetically = 'Alphabetically',
};