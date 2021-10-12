/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { IUser, IUser_lw } from '../accounts';
import { ITractable } from '../db/';

import { ELanguage } from './languages';
import { IVocab, IVocab_lw } from './vocab';

/**
 * A lightweight interface for collections
 * 
 * @readonly lang {ELanguage} the parent language
 * @readonly author {IUser_lw} the author of the collection
 * @readonly items {IVocab_lw[]} the vocab items
 */
export interface ICollection_lw extends ITractable {
    readonly lang:ELanguage;
    readonly author:IUser_lw;
    readonly items:IVocab_lw[];
}

/**
 * An interface for collections
 * 
 * @readonly lang {ELanguage} the parent language
 * @readonly name {string} name of the collection
 * @readonly description {string} description of the collection
 * @readonly author {IUser} the author of the collection
 * @readonly items {IVocab[]} the vocab items
 */
export interface ICollection extends ICollection_lw {
    readonly name:string;
    readonly description:string;

    readonly author:IUser;
    readonly items:IVocab[];
}
