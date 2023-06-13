import { IRoles } from './IRoles';
import { IStatus } from './IStatus';
import { ITeams } from './ITeams';

export interface IDeveloper {
  id: string;
  name: string;
  email: string;
  Role: IRoles;
  Status: IStatus;
  Team: ITeams;
}

export interface IDeveloperReq {
  name: string;
  email: string;
  RoleId: number;
  StatusId: number;
  TeamId: number;
}