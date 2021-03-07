import UniqueEntityID from '@core/domain/UniqueEntityID';

export type UpdatePartial<T> = {
    [P in keyof T]?: T[P];
} & {
    id: UniqueEntityID;
};

export type AllOptional<T> = {
    [P in keyof T]?: T[P];
};
