const isProd = process.env.NODE_ENV ? process.env.NODE_ENV.match('production') : false;
const rootDir = 'dist'; // isProd ? 'dist' : 'src';

const dbName = isProd ? 'prod_ddd_payday' : 'dev_ddd_payday';

module.exports = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'root',
    password: 'lhang10+',
    database: dbName,
    synchronize: true,
    logging: false,
    entities: [`${rootDir}/infra/database/typeorm/entities/*.**`],
    migrations: [`${rootDir}/infra/database/typeorm/migrations/*.**`],
    cli: {
        migrationsDir: `${rootDir}/infra/database/typeorm/migrations`,
    },
};
