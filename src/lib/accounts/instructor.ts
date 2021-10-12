/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { ICourse, ICourse_lw } from "../courses";

import { IUser, IUser_lw } from './user';

/**
 * A lightweight interface for instructors
 * 
 * @readonly courses {ICourse_lw[]}
 */
export interface IInstructor_lw extends IUser_lw {
    readonly courses:ICourse_lw[];
}

/**
 * An interface for instructors
 * 
 * @readonly courses {ICourse[]}
 */
export interface IInstructor extends IUser {
    readonly courses:ICourse[];
}
