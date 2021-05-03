import 'reflect-metadata';
import initServer from '@infra/http/server';
import connection from '@infra/database/typeorm/connection';

connection.create().then(initServer);
