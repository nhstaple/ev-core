/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */

import * as r from 'rethinkdb';

import { ITractable } from '../../../types/db'
import { ICollection, ICollection_lw } from '../../../types/db/assets/collection';
import { IVocab, IVocab_lw } from '../../../types/db/assets/vocab';
import { IDatabaseCredentials, IDatabaseDevice } from '../../../types/db/device';

export class Rethink implements IDatabaseDevice {
    /** PUBLIC MEMBERS */
    // eslint-disable-next-line functional/prefer-readonly-type
    credentials!:IDatabaseCredentials;

    /** PRIVATAE MEMBERS */
    // eslint-disable-next-line functional/prefer-readonly-type
    private _conn!:r.Connection|null;

    /** PRIVATE METHODS */
    private _validateConnection():boolean {
        if(this._conn == null) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Attempting to query with a unconnected db client');
            return false;
        }
        return true;
    }

    // eslint-disable-next-line functional/no-return-void
    public closeConnection(wait:boolean):void {
        if(this._conn != null) {
            this._conn.close({noreplyWait: wait}, (err) => {
                if(err) {
                    // eslint-disable-next-line functional/no-throw-statement
                    throw err;
                } else {
                    this._conn = null;
                }
            });
        }
    }

    /** DEFAULT CONSTRUCTOR */
    constructor(credentials:IDatabaseCredentials) {
        if(!credentials) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Invalid db credentials!');
        }
        this.credentials = credentials;
    }

    /** PUBLIC METHODS */
    async connect(credentials:IDatabaseCredentials, force:boolean):Promise<boolean> {
        if(this._conn == null || force) {
            if(this._conn != null) {
                if(force) {
                    console.log('Forcing a new connection from:');
                    console.log(this._conn);
                    console.log('to:');
                    console.log(credentials);
                }
                // close the current connection
                this.closeConnection(true);
            }

            // define the connection options
            const options:r.ConnectionOptions = {
                'host': credentials.host,
                'port': credentials.port,
                'db': credentials.db,
                'user': credentials.user,
                'password': credentials.password,
                'timeout': credentials.timeout,
                'ssl': credentials.ssl as r.ConnectionOptions
            };

            // connect to rethink
            await r.connect(options, async (err:Error, conn:r.Connection) => {
                // eslint-disable-next-line functional/no-throw-statement
                if (err) { throw err; }
                this._conn = conn;
            });
        } else {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Database client already has a connection! Try setting the force flag.');
            return false;
        }
        return true;
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async getDbNames(): Promise<string[]> {
        const databases = await r.dbList().run(
            this._conn as r.Connection
        ).then(function(results) {
            return results;
        })

        return databases;
    }

    async createDB(dbName:string):Promise<boolean> {
        try {
            const databases = await this.getDbNames();
            if(!databases.includes(dbName)) {
                r.dbCreate(dbName).run(this._conn as r.Connection, (err) => {
                    if(err) { 
                        console.log(err);
                    } else { 
                        // console.log(result);
                        console.log(`created DB "${dbName}"`);
                    }
                })
            } else {
                console.log(`database "${dbName}" exists!`);
                return false;
            }
            return true;
        }
        catch (err) {
            console.log('There was an error on db initialization')
            console.log(err)
            return false;
        }
    }

    async dropDB(dbName:string): Promise<boolean> {
        try {
            const databases = await this.getDbNames();
            if(databases.includes(dbName)) {
                console.log(`database "${dbName}" exists!`)
                r.dbDrop(dbName).run(this._conn as r.Connection, (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        // console.log(result);
                        console.log(`dropped DB "${dbName}"`);
                    }
                })
            } else {
                console.log(`database "${dbName}" does not exists!`)
            }
            return true;
        } catch(err) {
            console.log(`error dropping database "${dbName}"`)
            console.log(err)
            return false;
        }
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async query(table:string):Promise<ITractable[]> {
        if(!this._validateConnection()) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Attempting to query with a unconnected db client');
            return [];
        }
        
        const p = r.db(this.credentials.db).table(table).run(this._conn as r.Connection);
        // eslint-disable-next-line functional/prefer-readonly-type
        const data:ITractable[] = await p.then((curs:r.Cursor) => {
            return curs.toArray().then(function(results) {
                return results;
            })
        })

        return data;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    async insert(table:string, row:Object):Promise<boolean> {
        this._validateConnection();

        // eslint-disable-next-line functional/no-let
        let res!:boolean;
        r.table(table).insert(row).run(this._conn as r.Connection, (err, data) => {
            if(err) {
                // eslint-disable-next-line functional/no-throw-statement
                throw err;
                res = false;
            }
            else {
                console.log(data);
                res =  true;
            }
        });

        if(res) {
            return true;
        } else {
            return false;
        }
    }

    async update(table:string, item:IVocab, attribute:Record<string, unknown>):Promise<boolean> {
        if(!this._validateConnection()) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Attempting to query with an invalid db connection');
            return false;
        }

        try {
            await r.db(this.credentials.db).table(table).filter({
                'id': item.id
            }).update(attribute).run(this._conn as r.Connection, () => {
                return;
            });

            return true;
        } catch(err) {
            console.log('Error updating!');
            console.log(err);
            return false;
        }
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async deleteItem(table:string, uuid:ITractable[]|ITractable):Promise<boolean> {
        if(!this._validateConnection()) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Attempting to delete an item with an invalid db connection');
            return false;
        }
        
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error('Not implemented!');

        return false;

        console.log(table, uuid);
    }

    async createUUID(name:string):Promise<string> {
        // eslint-disable-next-line functional/no-let
        let ID!:string;
        await r.uuid(name).run(this._conn as r.Connection, (err:Error, res:any) => {
            if(err) {
                console.log('Error creating UUID on: ' + name);
                // eslint-disable-next-line functional/no-throw-statement
                throw err;
            } else {
                ID = res as string;
            }
        })
        return ID;
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async getVocab(table:string, uuid:ITractable[]|ITractable, callback: (err:Error, data:Record<string, unknown>) => boolean):Promise<IVocab[]> {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error('Not implemented!');
        return [];

        console.log(table, uuid, callback);
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async getCollection(table:string, uuid:ITractable[]|ITractable, callback: (err:Error, data:Record<string, unknown>) => boolean):Promise<ICollection[]> {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error('Not implemented!');
        return [];

        console.log(table, uuid, callback);
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async getVocab_lw(table:string, uuid:ITractable[]|ITractable, callback: (err:Error, data:Record<string, unknown>) => boolean):Promise<IVocab_lw[]> {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error('Not implemented!');
        return [];

        console.log(table, uuid, callback);
    }

    // eslint-disable-next-line functional/prefer-readonly-type
    async getCollection_lw(table:string, uuid:ITractable[]|ITractable, callback: (err:Error, data:Record<string, unknown>) => boolean):Promise<ICollection_lw[]> {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error('Not implemented!');
        return [];

        console.log(table, uuid, callback);
    }
}

// eslint-disable-next-line no-var
var client:IDatabaseDevice;

export async function init_rethink(credentials:IDatabaseCredentials):Promise<IDatabaseDevice> {
    const rethink = new Rethink(credentials);
    console.log(credentials);
    await rethink.connect(rethink.credentials, true);
    client = rethink;
    return client;
}

