/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { IInstructor, IInstructor_lw } from '../accounts/instructor';
import { ITractable } from '../db/assets';
import { ICollection, ICollection_lw } from '../db/assets/collection';

/**
 * An enum for course statuses
 * @member template {0} to instantiate future courses
 * @member inactive {1} for a course not in session
 * @member active {2} for a course in session
 * @member archived {4} for previous courses
 */
export enum ECourseStatus {
    template = 0,
    inactive = 1,
    active = 2,
    archived = 4
}

export type TCourseStatus = keyof typeof ECourseStatus;

/**
 * A lightweight interface for courses
 *
 * @readonly collections {ICollection_lw[]} a list of collections associated with the course
 * @readonly creator {ICreator_lw} the creator of the course
 */
export interface ICourse_lw extends ITractable {
    readonly collections:ICollection_lw[];
    readonly instructor:IInstructor_lw;
}

/**
 * An interface for courses
 * 
 * @readonly name {string} the name of the course
 * @readonly catalog {string} the catalog number of the class
 * @readonly collections {ICollection[]} a list of collections associated with the course
 * @readonly creator {ICreator} the creator of the course
 */
export interface ICourse extends ICourse_lw {
    readonly name:string;
    readonly catalog:string;
    
    readonly collections:ICollection[];
    readonly instructor:IInstructor;
}
