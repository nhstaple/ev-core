
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { ITractable } from '../db';

/**
 * An enumerator for user pronouns
 * @member they {0} they/them
 * @member he   {1} he/him
 * @member she  {2} she/her
 */
export enum EPronoun {
    they = 0,
    he = 1,
    she = 2
}

export type TPronoun = keyof typeof EPronoun;

/**
 * An interface for the names of users 
 * 
 * @member first {string}
 * @member last {string}
 * @member middle? {string}
 * @member pronoun? {EPronoun}
 */
export interface IName {
    first:string;
    last:string;
    middle?:string;
    pronoun?:EPronoun;
}

/**
 * An interface for the emails of users
 * 
 * @readonly address {string} first part of an email before the @
 */
export interface IEmail {
    readonly address:string;
}

/**
 * An enumerator for the priveleges associated with user accounts
 * 
 * @member student {0} most basic permissions
 * @member TA {1} elevated permissions beneath an instructor
 * @member instructor {2} elevated permissions beneath a creator
 * @member creator {3} second most powerful account
 * @member admin {4} the most powerful account
 */
export enum EAccountRank {
    student = 0,
    TA = 1,
    instructor = 2,
    creator = 3,
    admin = 4
}

export type TAccountRank = keyof typeof EAccountRank;

/**
 * A lightweight interface for users
 * 
 * @readonly rank {EAccountRank} an enum for account permissions
 */
export interface IUser_lw extends ITractable {
    readonly rank:EAccountRank;
}

/**
 * An interface for users 
 * 
 * @readonly uuid {string} a unique ID for the user (db readable)
 * @readonly rank {EAccountRank} an enumerator for account permissions
 * @readonly name {IName} an interface for the user's name
 * @readonly email {IEmail} an interface for the user's email
 */
export interface IUser extends IUser_lw {
    readonly name:IName;
    readonly email:IEmail;
}
