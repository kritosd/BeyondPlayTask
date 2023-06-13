export interface IRoles {
    id: number;
    name: string;
}
export interface IStatus {
    id: number;
    name: string;
}
export interface ITeams {
    id: number;
    name: string;
}

export interface IDeveloper {
    id: string;
    name: string;
    email: string;
    Role: IRoles;
    Status: IStatus;
    Team: ITeams;
}

export interface IDeveloperSendDescriptor {
    name: string;
    email: string;
    RoleId: number;
    StatusId: number;
    TeamId: number;
};

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