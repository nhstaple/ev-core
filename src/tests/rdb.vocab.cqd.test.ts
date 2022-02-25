/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import { init_rethink } from '../lib/db';
import { Rethink } from '../lib/db/_rdb/client'
import { 
    IDatabaseCredentials, // IDatabaseDevice,
    //ITractable,
    IVocab
} from '../types';

test('test_vocab_cqd', async () => {
    const DB_NAME = 'test_vocab_cqd';
    const TABLE_NAME = 'vocab';
    const HOST = 'localhost';
    const PORT = 28015;
    const USER = 'admin';
    const VOCAB_ID = { 'id': 'test_id'};

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

    // create a DB
    console.log(`current DBs\n${await rethink.getDbNames()}`);
    expect(await rethink.createDB(DB_NAME)).toBeTruthy();    
    
    // create  vocab
    const v:IVocab = {
        id: VOCAB_ID.id,
        pos: 0, // EPartOfSpeech.noun
        lang: 0, // ELanguage.english
        arbit: { 'id': 'null'},
        value: 'el perro',
        translation: 'the dog',
        s3Key: 'null'
    }
    console.log('item to insert\n', v)
    
    // insert the vocab
    expect(rethink.insert(TABLE_NAME, v)).toBeTruthy()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const vocabs = await rethink.getVocab(TABLE_NAME, VOCAB_ID)
    console.log(vocabs[0])

    // query

    // delete the vocab

    // drop a DB and close the client
    expect(await rethink.dropDB(DB_NAME)).toBeTruthy();
    rethink.closeConnection(true);
})