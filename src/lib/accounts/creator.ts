/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { ICollection, ICollection_lw } from '../assets/collection';

import { IUser, IUser_lw } from './user';

/**
 * A lightweight interface for creators
 * 
 * @readonly collections {ICollection_lw[]}
 */
export interface ICreator_lw extends IUser_lw {
    readonly collections:ICollection_lw[];
}

/**
 * An interface for creators
 * 
 * @readonly collections {ICollection[]}
 */
export interface ICreator extends IUser {
    readonly collections:ICollection[];
}
