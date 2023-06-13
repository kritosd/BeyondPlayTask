import * as dotenv from 'dotenv';
import app from './app';
import cors from 'cors';
const helmet = require('helmet');
import db from './models';
import { seedDatabase } from './seedDatabase';

const port = process.env.PORT || 3000
app.use(helmet());
app.use(cors({origin: true, credentials: true}));

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        seedDatabase();
        console.log(`App listening on port: ${port}`)
    })
});