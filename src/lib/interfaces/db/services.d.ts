
/**
 * An enum for the supported database services
 * @member rethink {0}
 * @TODO add more!
 */
export enum EDatabaseService {
    rethink = 0
}

/**
 * Available database services
 */
export type TDatabaseService = keyof typeof EDatabaseService;
