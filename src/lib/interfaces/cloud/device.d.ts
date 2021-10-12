/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-method-signature */
/* eslint-disable functional/prefer-type-literal */

import { TCloudService } from './services';

/**
 * An interface for managing credentials for cloud devices
 * 
 * @readonly service {TCloudService} the API for storing assets in the cloud
 * 
 * AWS.S3
 * @readonly accessKey? {string} 
 * @readonly secretKey? {string} 
 * @readonly region? {string} 
 * @readonly bucket? {string}
 * @readonly location? {string}
 */
export interface ICloudCredentials {
    readonly service:TCloudService;

    /** AWS */
    readonly accessKeyId?:string;
    readonly secretAccessKey?:string;
    readonly region?:string;
    readonly bucket?:string;
    readonly location?:string;
}

/**
 * An interface for interacting with cload storage
 * 
 * All of the following are @async functions:
 * @method get(string, function) -> boolean
 * @method upload(string, record, record, function) -> boolean
 * @method update(string, record, record, function) -> boolean
 * @method remove(string, function) -> boolean
 */
export interface ICloudDevice {
    /**
     * @async
     * @name get()
     * @description retrieves data stored in the cloud
     * @param key {string} location in the cloud device
     * @param callback {Function} standard callback function
     * 
     * @returns a list of items on success, empty list on error
     */
    get(
        key:string,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<Record<string, unknown>[]>;

    /**
     * @async
     * @name upload()
     * @description inserts data into the cloud
     * @param key {string} location in the cloud device
     * @param data {Record} the data to store into the cloud
     * @param metadata {Record} metadata to store with the upload
     * @param callback {Function} standard callback function
     * 
     * @returns true on success, false on error
     */
    upload(
        key:string,
        data:Record<string, unknown>,
        metadata:Record<string, unknown>,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<boolean>;

    /**
     * @async
     * @name update()
     * @description updates information stored into the cloud
     * @param key {string} location in the cloud device
     * @param data {Record} the data to store into the cloud
     * @param metadata {Record} metadata to store with the update
     * @param callback {Function} standard callback function
     * 
     * @returns true on success, false on error
     */
    update(
        key:string,
        data:Record<string, unknown>,
        metadata:Record<string, unknown>,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<boolean>;

    /**
     * @async
     * @name remove() 
     * @description deletes data in the cloud
     * @param key {string} location in the cloude device
     * @param callback {Function} standard callback function
     * 
     * @returns true on success, false on error
     */
    remove(
        key:string,
        callback: (err:Error, data:Record<string, unknown>) => boolean
    ):Promise<boolean>;
}

