import { GlobalConfig } from './interface';
const DEFAULT_TRY_TIMES = 3;
const NOOP = function (): void { /* Noop */ };
let globalConfig: GlobalConfig = {
    logTryTimes: DEFAULT_TRY_TIMES,
    errorHandler: NOOP
};
function validOrBackup (
    param: any,
    type: 'string' | 'number' | 'function',
    backup: string | number | Function | undefined
): string | number | Function | undefined {
    return typeof param === type ? param : backup;
}
export default {
    set: (configOb: GlobalConfig): void => {
        globalConfig = {
            publicKey: validOrBackup(configOb.publicKey, 'string', undefined) as string,
            logTryTimes: validOrBackup(
                configOb.logTryTimes,
                'number',
                DEFAULT_TRY_TIMES
            ) as number,
            reportUrl: validOrBackup(configOb.reportUrl, 'string', undefined) as string,
            dbName: validOrBackup(configOb.dbName, 'string', undefined) as string,
            errorHandler: validOrBackup(
                configOb.errorHandler,
                'function',
                NOOP
            ) as Function
        };
    },
    get: (propertyKey: keyof GlobalConfig): string | number | Function | undefined => {
        return globalConfig[propertyKey];
    }
};
