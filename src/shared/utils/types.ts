export type AllOptional<T> = {
    [P in keyof T]?: T[P];
};
