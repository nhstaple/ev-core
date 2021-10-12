
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/prefer-type-literal */

import { ITractable } from '../db';

import { ELanguage } from './languages';

/**
 * An enum for parts of speech
 * 
 * @member noun {0}
 * @member verb {1}
 * @member participle {2}
 * @member article {3}
 * @member pronoun {4}
 * @member preposition {5}
 * @member adverb {6}
 * @member conjunction {7}
 */
 export enum EPartOfSpeech {
    noun = 0,
    verb = 1,
    participle = 2,
    article = 3,
    pronoun = 4,
    preposition = 5,
    adverb = 6,
    conjunction = 7
}

export type TPartOfSpeech = keyof typeof EPartOfSpeech;

/**
 * A lightweight interface for vocab
 * 
 * @readonly lang {ELanguage} the parent language
 * @readonly arbit {ITractable} the universal word
 */
export interface IVocab_lw extends ITractable {
    readonly lang:ELanguage;
    readonly arbit:ITractable;
    readonly pos:EPartOfSpeech;
}

/**
 * An interface for vocabulary items stored in collections
 * 
 * @readonly lang {ELanguage} the parent language
 * @readonly arbit {ITractable} the universal word
 * 
 * @readonly value {string} the native language
 * @readonly translation {string} the English translation
 * @readonly s3Key {string} UUID associated with AWS.S3 bucket
 *
 * @member idArbit? {string} ID of the arbitrary word
 * @member arbitId? {string} ID of the arbitrary word
 * @member idLegacy? {string} ID from previous iterations
 * @member unitType? {string}   
 * @member wordType? {string}    
 */
export interface IVocab extends IVocab_lw {
    readonly value:string;
    readonly translation:string;
    readonly s3Key:string;

    /** @deprecated */
    idArbit?:string;
    arbitId?:string;
    idLegacy?:string;
    unitType?:string;
    wordType?:string;
}
