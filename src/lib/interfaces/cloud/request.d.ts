/* eslint-disable functional/prefer-type-literal */

import { ECloudService } from './services'

export interface ICloudRequest {
    readonly service:ECloudService;

    /* AWS.S3 */
    readonly bucket?:string;
    readonly key?:string;
}

export enum ECloudReponseStatus {
    success = 0,
    error = 1
    /* TODO add more error codes for better debugging and runtime info */
}

export interface ICloudResponse extends ICloudRequest {
    readonly status:ECloudReponseStatus;
    readonly image:Buffer;
    readonly sound:Buffer;
}
