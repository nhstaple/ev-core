
import { IDatabaseCredentials, IDatabaseDevice } from '../../interfaces/db/device';

/*
var r = require('rethinkdb')

class Rethink implements IDatabaseDevice {
    dbName:string;
    readonly service:TDatabaseService;

    private _conn:Connection|null;

    // TOOD replace with IDatabaseCredentials
    constructor(dbName:string) {
        if(dbName.length == 0) {
            throw new Error('Invalid database name!');
        }
        this.service = 'rethinkdb';
        this.dbName = dbName;
        this._conn = null;
        this.connect(this.dbName, true);
    }

    async connect(dbName:string="", force:boolean=false):Promise<void> {
        if(this._conn == null || force) {
            this.dbName = dbName.length > 0 ? dbName : this.dbName;
            var connection:Connection|null = null;
            await r.connect({
                'host': HOST,
                'port': PORT,
                'db': this.dbName,
                'user': USER,
                'password': PASSWORD,
                'timeout': TIMEOUT,
                'ssl': SSL
            }, async (err:Error, conn:Connection) => {
                if (err) throw err;
                connection = conn;
            });
            this._conn = connection;
        } else {
            throw new Error('DataBase client already has a connection! Try setting the force flag.');
        }
    }

    async query(table:string):Promise<IUnitItem[]> {
        if(this._conn == null) {
            await this.connect();
        }
        
        var p = r.db(this.dbName).table(table).run(this._conn);
        var data:IUnitItem[] = await p.then((curs:Cursor) => {
            return curs.toArray().then(function(results) {
                return results;
            })
        })

        return data;
    }

    async insert(table:string, item:IUnitItem):Promise<boolean> {
        if(this._conn == null) {
            await this.connect();
        }

        throw new Error('Not implemented!');

        return false;
    }

    async update(table:string, item:IUnitItem, attribute:Object):Promise<boolean> {
        if(this._conn == null) {
            await this.connect();
        }

        try {
            await r.db(this.dbName).table(table).filter({
                'id': item.id
            }).update(attribute).run(this._conn, () => {});

            return true;
        } catch(err) {
            console.log('Error updating!');
            console.log(err);
            return false;
        }
    }

    async deleteItem(table:string, id:string):Promise<boolean> {
        if(this._conn == null) {
            await this.connect();
        }
        
        throw new Error('Not implemented!');

        return false;
    }

    async createID(name:string):Promise<string> {
        var ID:string = "";
        await r.uuid(name).run(this._conn, (err:any, res:any) => {
            if(err) {
                console.log('Error creating UUID on: ' + name);
                throw err;
            } else {
                ID = res as string;
            }
        })
        return ID;
    }
}

*/

// eslint-disable-next-line no-var
var client:IDatabaseDevice;

export function init_rethink(credentials:IDatabaseCredentials):IDatabaseDevice {
    /** @TODO */
    // client = new Rethink(credentials);
    return client;
}

