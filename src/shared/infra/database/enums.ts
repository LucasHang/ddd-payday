/* eslint-disable no-use-before-define */
export function booleanAsDefaultIndicator(value: boolean): DefaultIndicator {
    return value ? DefaultIndicator.SIM : DefaultIndicator.NAO;
}

export function defaultIndicatorAsBoolean(value: DefaultIndicator): boolean {
    return value === DefaultIndicator.SIM;
}

export enum DefaultIndicator {
    SIM = 'S',
    NAO = 'N',
}
