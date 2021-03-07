/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
export type Result<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
    readonly value: L;

    constructor(value: L) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return true;
    }

    isRight(): this is Right<L, A> {
        return false;
    }
}

export class Right<L, A> {
    readonly value: A;

    constructor(value: A) {
        this.value = value;
    }

    isLeft(): this is Left<L, A> {
        return false;
    }

    isRight(): this is Right<L, A> {
        return true;
    }
}

export const left = <L, A>(l: L): Result<L, A> => {
    return new Left(l);
};

export const right = <L, A>(a: A): Result<L, A> => {
    return new Right<L, A>(a);
};

export const combine = (results: Result<any, any>[]): Result<any, any> => {
    for (const result of results) {
        if (result.isLeft()) return result;
    }
    return right(null);
};
