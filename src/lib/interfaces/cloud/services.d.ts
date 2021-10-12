
/**
 * An enum for the supported cloud devices
 * @member aws {0}
 * @TODO add more!
 */
export enum ECloudService {
    aws = 0
}

/**
 * Available cloud services
 */
export type TCloudService = keyof typeof ECloudService;
