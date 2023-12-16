interface DatabaseConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const config: DatabaseConfig = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'yahia123',
  DB: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default config