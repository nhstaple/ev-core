
export enum EDatabaseService {
    rethink = 0
}

export type TDatabaseService = keyof typeof EDatabaseService;
