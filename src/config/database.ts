import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DB_URL;

if (!databaseUrl) {
  throw new Error('Database URL is not defined in environment variables');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;
