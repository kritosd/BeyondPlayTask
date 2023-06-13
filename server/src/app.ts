
import express from 'express';
import { developersRouter } from './Controllers/DevelopersController';
import { rolesRouter } from './Controllers/RolesController';
import { statusesRouter } from './Controllers/StatusesController';
import { teamsRouter } from './Controllers/TeamsController';
import { randomizeRouter } from './Controllers/RandomizeController';

const app = express();
app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});
app.use(express.json());

app.use('/api/developers', developersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/statuses', statusesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/randomize', randomizeRouter);

export default app;