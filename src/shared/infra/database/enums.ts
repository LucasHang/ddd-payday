/* eslint-disable no-use-before-define */
export function booleanAsDefaultIndicator(value: boolean): DefaultIndicador {
    return value ? DefaultIndicador.SIM : DefaultIndicador.NAO;
}

export function defaultIndicatorAsBoolean(value: DefaultIndicador): boolean {
    return value === DefaultIndicador.SIM;
}

export enum DefaultIndicador {
    SIM = 'S',
    NAO = 'N',
}
