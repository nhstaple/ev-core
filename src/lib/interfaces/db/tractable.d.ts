/* eslint-disable functional/prefer-type-literal */

/**
 * An interface for items tractable by the backend
 * If it's tractable, it's in the database!
 * 
 * @readonly uuid {string} a unique ID
 */
export interface ITractable {
    readonly id:string;
}