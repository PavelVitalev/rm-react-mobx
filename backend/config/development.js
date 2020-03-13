const mongoUrl = 'mongodb://root:root@angular-edu-app-db-shard-00-00-gvpze.mongodb.net:27017,angular-edu-app-db-shard-00-01-gvpze.mongodb.net:27017,angular-edu-app-db-shard-00-02-gvpze.mongodb.net:27017/test?ssl=true&replicaSet=angular-edu-app-db-shard-0&authSource=admin&retryWrites=true&w=majority';
// const mongoUrl = -  'mongodb+srv://root:root@angular-edu-app-db-gvpze.mongodb.net/interns-database?retryWrites=true&w=majority';

const secret = 'test';
const loggerMode = 'dev';

const port = Number(process.env.PORT) || 3000;
const dbUrl = process.env.PROD_DB_URL || mongoUrl;

const config = {
  app: {
    port,
    secret,
    loggerMode,
  },
  db: {
    url: dbUrl,
  },
};

export default config;
