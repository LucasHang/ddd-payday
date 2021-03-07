/* eslint-disable no-use-before-define */
import UniqueEntityID from './UniqueEntityID';

export default abstract class Entity<T> {
    protected readonly _id: UniqueEntityID;

    protected readonly props: T;

    constructor(props: T, id?: UniqueEntityID) {
        this._id = id || new UniqueEntityID();
        this.props = props;
    }

    public equals(object?: Entity<T>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }
}

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};
