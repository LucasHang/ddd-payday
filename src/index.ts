import Identifier from '@core/domain/Identifier';

export function teste(): Identifier<number> {
    const teste2 = new Identifier(1);
    console.log(teste2);
    return teste2;
}

teste();
