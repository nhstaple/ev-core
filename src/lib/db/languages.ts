
/**
 * An enum representing supported languages
 * 
 * @member english {0} 
 * @member spanish {1}
 * @member punjabi {2}
 * @TODO add support for more languages!
 */
export enum ELanguage {
    english = 0,
    spanish = 1,
    punjabi = 2
}

export type TLanguage = keyof typeof ELanguage;

