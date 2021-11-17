
import { init_rethink } from './lib/db';
import { 
    IDatabaseCredentials, IDatabaseDevice,
    ITractable,
    IVocab
} from './types';

async function test() {

    const credentials:IDatabaseCredentials = {
        service: 'rethink',
        host: '192.168.1.134',
        port: 28015,
        db: 'test',
        user: 'admin',
        timeout: 100,
        ssl: undefined
    }

    const rethink:IDatabaseDevice = await init_rethink(credentials);

    const test_vocab:IVocab = {
        lang: 0,
        arbit: {id: 'def'} as ITractable,
        value: 'el burrito',
        translation: 'the burrito',
        s3Key: await rethink.createUUID('el burrito'),
        pos: 0,
        id: await rethink.createUUID('el burrito')
    }

    await rethink.insert('vocab', test_vocab, (err:Error, data:Record<string, unknown>) => {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
        return true;
    })

}

test();