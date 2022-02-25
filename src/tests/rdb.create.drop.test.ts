/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import { init_rethink } from '../lib/db';
import { 
    IDatabaseCredentials, IDatabaseDevice
} from '../types';

test('db_create_drop', async () => {
    const DB_NAME = 'test_db_create_drop';
    const TABLE_NAME = 'test_table';
    const HOST = 'localhost';
    const PORT = 28015;
    const USER = 'admin';

    /* initialization */
    // db credentials
    const credentials:IDatabaseCredentials = {
        service: 'rethink',
        host: HOST,
        port: PORT,
        db: DB_NAME,
        user: USER,
        timeout: 100,
        ssl: undefined
    }

    // initialize the db client using the above credentials
    const rethink:IDatabaseDevice = await init_rethink(credentials);

    // create a DB
    console.log(`current DBs\n${await rethink.getDbNames()}`);
    expect(await rethink.createDB(DB_NAME)).toBeTruthy();    
    
    // create a table
    await rethink.createTable(DB_NAME, TABLE_NAME);
    await rethink.getTableNames(DB_NAME);

    // drop a table
    
    // drop a DB
    console.log(`current DBs\n${await rethink.getDbNames()}`);
    
    expect(await rethink.dropDB(DB_NAME)).toBeTruthy();
    console.log(`current DBs\n${await rethink.getDbNames()}`);
    rethink.closeConnection(true);
})
