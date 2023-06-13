import db from './models';
import { roles } from './seeders/roles';
import { statuses } from './seeders/statuses';
import { teams } from './seeders/teams';
import { developers } from './seeders/developers';

export const seedDatabase = async () => {
    const createRoles = () => {
        roles.map(role => {
            db.Role.create(role);
        });
    };

    const createStatuses = () => {
        statuses.map(status => {
            db.Status.create(status);
        });
    };

    const createTeams = () => {
        teams.map(team => {
            db.Team.create(team);
        });
    };

    const createDevelopers = () => {
        developers.map(developer => {
            db.Developer.create(developer);
        });
    };

    const allRoles = await db.Role.findAll();
    if (allRoles.length == 0) {
        createRoles();
    }
    const allStatuses = await db.Status.findAll();
    if (allStatuses.length == 0) {
        createStatuses();
    }
    const allTeams = await db.Team.findAll();
    if (allTeams.length == 0) {
        createTeams();
    }
    const allDevelopers = await db.Developer.findAll();
    if (allDevelopers.length == 0) {
        createDevelopers();
    }
};