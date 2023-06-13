
import { v4 as uuidv4 } from 'uuid';
import { DeveloperAttributes } from '../models/Developer';
export const developers: DeveloperAttributes[] = [
    {
        id: uuidv4(),
        name: 'Albereto Summers',
        email: 'albereto@beyondplay.io',
        RoleId: 1,
        StatusId: 1,
        TeamId: 1
    },
    {
        id: uuidv4(),
        name: 'Gina Brady',
        email: 'gina@beyondplay.io',
        RoleId: 1,
        StatusId: 1,
        TeamId: 1
    },
    {
        id: uuidv4(),
        name: 'Jody Rice',
        email: 'jody@beyondplay.io',
        RoleId: 2,
        StatusId: 2,
        TeamId: 2
    },
    {
        id: uuidv4(),
        name: 'Kay Sandoval',
        email: 'kay@beyondplay.io',
        RoleId: 2,
        StatusId: 3,
        TeamId: 3
    },
    {
        id: uuidv4(),
        name: 'Willis Daniel',
        email: 'willis@beyondplay.io',
        RoleId: 2,
        StatusId: 1,
        TeamId: 1
    }
]