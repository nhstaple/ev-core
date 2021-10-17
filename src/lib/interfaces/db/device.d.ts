/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-method-signature */
/* eslint-disable functional/prefer-type-literal */

import * as r from 'rethinkdb';

import { ICollection, ICollection_lw, IVocab, IVocab_lw } from '../assets/';

import { TDatabaseService } from './services';
import { ITractable } from './tractable';

/**
 * An interface for managing credentials for databases
 * 
 * @readonly service {TDatabaseService} the API for storing data into a db
 * 
 * RethinkDB
 * @readonly host? {string} the IP address of the host
 * @readonly port? {string} the port associated with the host
 * @readonly db? {string} the name of the database to connect to 
 * @readonly user? {string} the name of the user accessing the db
 * @readonly password? {string} the user's password
 * @readonly timeout? {number|string} the amount of time (ms?) to timeout requests
 * @readonly ssl? {string|null} secure credentials to accessing rethink
 */
 export interface IDatabaseCredentials {
    readonly service:TDatabaseService;

    /** rethink */
    readonly host?:string;
    readonly port?:number;
    readonly db:string;
    readonly user?:string;
    readonly password?:string;
    readonly timeout?:number;
    readonly ssl?:number|r.ConnectionOptions;
}

/**
 * An interface for interacting with databases
 * 
 * Utility Methods
 * @method connect(string, boolean) -> boolean
 * @method createUUID(string, boolean) -> boolean
 * 
 * Access Methods
 * @method query(string, Record, function) -> ITractable[]
 * @method getVocab(string, ITractable[] | ITractable, function) -> IVocab[]
 * @method getCollection(string, ITractable[] | ITractable, function) -> ICollection[]
 * 
 * Mutable Methods
 * @method insert(string, Record, function) -> boolean
 * @method update(string, ITractable, attribute, funtion) -> boolean
 * @method deleteItem(string, ITractable) -> boolean
 * 
 * Lightweight Methods
 * @method getVocab_lw(string, ITractable[] | ITractable, function) -> IVocab_lw[]
 * @method getCollection_lw(string, ITractable[] | ITractable, function) -> ICollection_lw[]
 */
export interface IDatabaseDevice {
    /** utility functions */
    /**
     * @async
     * @method connect()
     * @description connect to a database
     * @param db {IDatabaseCredentials} the name of the database to connect to
     * @param force {boolean} a flag to force a connection if one exists
     * @param callback {function} a standard callback function
     * 
     * @returns true on a successful connection, false if a connection already exists, throw an error otherwise
     */
    connect(
        db:IDatabaseCredentials,
        force:boolean,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<boolean>;
    
    /**
     * @async
     * @method createUUID()
     * @description creates a unique ID
     * @param key {string} 
     * 
     * @returns returns a UUID on success, an empty string on failure
     */
    createUUID(
        key:string
    ):Promise<string>;

    /** access functions */
    /**
     * @async
     * @method query()
     * @description queries the database for information
     * @param table {string} the table to search in the db
     * @param filter {Record} a dictionary of attributes to filter against
     * @param callback {function} a standard callback function
     * 
     * @returns a list of UUIDs on success
     */
    query(
        table:string,
        filter:Record<string, unknown>,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<ITractable[]>;

    /**
     * @async
     * @method getVocab()
     * @description takes UUID(s) and returns all the information in the database
     * @param table {string} the table to search against in the db
     * @param uuid {ITractable[] | ITractable} UUID(s) to search in the database
     * @param callback {function} a standard callback function
     * 
     * @retuns a list of vocab items on success
     */
    getVocab(
        table:string,
        uuid:ITractable[]|ITractable,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<IVocab[]>;

    /**
     * @async
     * @method getCollection()
     * @description takes UUID(s) and returns collection data
     * @param table {string} the table to search against in the db
     * @param uuid {ITractable[] | ITractable} UUID(s) to search for
     * @param callback {function} standard callback function
     * 
     * @returns a list of collections on success
     */
    getCollection(
        table:string,
        uuid:ITractable[]|ITractable,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<ICollection[]>;

    /** mutable functions */
    /**
     * @async
     * @method insert()
     * @description inserts a row into the database 
     * @param table {string} the name of the table to insert into
     * @param row {Record} the object to insert
     * @param callback {function} standard callback funtion
     * 
     * @returns true on success, false on error
     */
    insert(
        table:string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        row:Object,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<boolean>;
    
    /**
     * @async
     * @method update()
     * @description updates a record in the database 
     * @param table {string} the table to update into
     * @param uuid {ITractable} the UUID to reference 
     * @param attributes {Record} the column(s) to update
     * @param callback {function} the standard callback function
     * 
     * @returns true on success, false on error
     */
    update(
        table:string,
        uuid:ITractable,
        attributes:Record<string, unknown>,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<boolean>;
    
    /**
     * @async
     * @method deleteItem()
     * @description drops (a) row(s) from the table
     * @param table {string} the table to insert into
     * @param uuid {ITractable[] | ITractable} the row(s) to drop
     * 
     * @returns true on success, false on error
     */
    deleteItem(
        table:string,
        uuid:ITractable[]|ITractable
    ):Promise<boolean>;

    /** lightweight methods */
    /**
     * @method getVocab_lw()
     * @param table {string} the table to search in the database
     * @param uuids {ITractable[]|ITractable} ID(s) of vocab(s) to retrieve
     * @param callback {function} a standard callback function
     * 
     * @returns a list of lightweight vocab items on success, empty list on error
     */
    getVocab_lw(
        table:string,
        uuids:ITractable[]|ITractable,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<IVocab_lw[]>;

    /**
     * @method getCollection_lw()
     * @param table {string} the table to search in the database
     * @param uuids {ITractable[]|ITractable} ID(s) of collection(s) to retrieve
     * @param callback {function} a standard callback function
     * 
     * @returns a list of lightweight vocab items on success, empty list on error
     */
    getCollection_lw(
        table:string,
        uuids:ITractable[]|ITractable,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<ICollection_lw[]>;

}
