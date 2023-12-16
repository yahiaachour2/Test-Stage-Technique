import {
  DataTypes,
  Dialect,
  Sequelize,
} from 'sequelize';

import dbConfig from '../config/db.config';
import DocumentModel from './document';

interface Db {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  documents: ReturnType<typeof DocumentModel>;
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db: Db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  documents: DocumentModel(sequelize, DataTypes),
};

export default db;
