import { createConnection, getConnection } from 'typeorm';

const connection = {
    async create(): Promise<void> {
        await createConnection();
        console.log('successfully connected with mysql database!');
    },

    async close(): Promise<void> {
        await getConnection().close();
    },

    async clear(): Promise<void> {
        const actualConnection = getConnection();
        const entities = actualConnection.entityMetadatas;

        const entityDeletionPromises = entities.map(entity => async () => {
            const repository = actualConnection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });

        await Promise.all(entityDeletionPromises);
    },
};

export default connection;
