import { UpdatePartial } from '@shared/utils/types';

export default abstract class BaseFakeRepo<T> {
    protected _items: T[];

    constructor() {
        this._items = [];
    }

    public addFakeItem(t: T): T {
        const { foundedItem } = this.findItem(t);
        if (foundedItem) throw new Error("Fake db says: Y're trying to insert an already existent item");

        this._items.push(t);
        return t;
    }

    protected updateFakeItem(t: UpdatePartial<T>): T {
        const { foundedItem, index } = this.findItem(t);

        if (!foundedItem || (!index && index !== 0))
            throw new Error("Fake db says: Y're trying to update an not existent item");

        const updatedItem = this.assignDefined(foundedItem, t);

        this._items.splice(index, 1, updatedItem);

        return updatedItem;
    }

    public removeFakeItem(t: UpdatePartial<T>): void {
        this._items = this._items.filter(item => !this.compareFakeItems(item, t));
    }

    protected findItem(t: T | UpdatePartial<T>): { foundedItem: T | undefined; index: number | undefined } {
        let index;

        const foundedItem = this._items.find((item, i) => {
            if (this.compareFakeItems(item, t)) {
                index = i;
                return true;
            }
            return false;
        });

        return { foundedItem, index };
    }

    protected assignDefined(target: T, source: UpdatePartial<T>): T {
        Object.keys(source).forEach(key => {
            const val = source[key as keyof UpdatePartial<T>];
            if (val !== undefined) {
                (target as any)[key] = val;
            }
        });

        return target;
    }

    abstract compareFakeItems(a: T, b: T | UpdatePartial<T>): boolean;
}
