/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { ICourse, ICourse_lw } from "../courses";

import { IUser, IUser_lw } from './user';

/**
 * A lightweight interface for students
 * 
 * @readonly courses {ICourse_lw[]}
 */
export interface IStudent_lw extends IUser_lw {
    readonly courses:ICourse_lw[];
}

/**
 * An interface for students
 * 
 * @readonly courses {ICourse[]}
 */
export interface IStudent extends IUser {
    readonly courses:ICourse[];
}
