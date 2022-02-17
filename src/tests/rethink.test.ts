/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import { init_rethink } from '../lib/db';
import { Rethink } from '../lib/db/_rdb/client'
import { 
    IDatabaseCredentials, // IDatabaseDevice,
    //ITractable,
    //IVocab
} from '../types';

test('vocab_insertion', async () => {
    const DB_NAME = 'test';
    // const TABLE_NAME = 'vocab';
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
    const rethink:Rethink = await init_rethink(credentials) as Rethink;

    /* get current DB names */
    console.log(`current DBs\n${await rethink.getDbNames()}`);

    // create
    expect(await rethink.createDB(DB_NAME)).toBeTruthy();
    // drop
    expect(await rethink.dropDB(DB_NAME)).toBeTruthy();

    rethink.closeConnection(true);
})

/*
async function test_vocab_insertion(DB_NAME='test', TABLE_NAME='vocab', HOST='localhost', PORT=28015, USER='admin') {
    


    // initialize the db client using the above credentials
    const rethink:IDatabaseDevice = await init_rethink(credentials);

    // * get current DB names 
    console.log('current DBs');
    console.log(await rethink.getDbNames());
    
    // * test DB create / removeDB 
    // ABBA block
    await rethink.createDB(DB_NAME); return;
    await rethink.dropDB(DB_NAME);
    await rethink.dropDB(DB_NAME);
    await rethink.createDB(DB_NAME);
    // BAAB block
    await rethink.dropDB(DB_NAME);
    await rethink.createDB(DB_NAME);
    await rethink.createDB(DB_NAME);
    await rethink.dropDB(DB_NAME);
    // create a test db
    await rethink.createDB(DB_NAME);

    // create a test item
    const test_vocab:IVocab = {
        lang: 0,
        arbit: {id: 'def'} as ITractable,
        value: 'el burrito',
        translation: 'the burrito',
        s3Key: await rethink.createUUID('el burrito'),
        pos: 0,
        id: await rethink.createUUID('el burrito')
    }

    await rethink.insert(TABLE_NAME, test_vocab, (err:Error, data:Record<string, unknown>) => {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
        return true;
    })

}

*/