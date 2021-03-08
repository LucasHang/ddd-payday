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

    protected updateFakeItem(t: T): T {
        const { foundedItem, index } = this.findItem(t);
        if (!foundedItem || !index) throw new Error("Fake db says: Y're trying to update an not existent item");

        const updatedItem = { ...foundedItem, ...t };

        this._items.splice(index, 1, updatedItem);

        return updatedItem;
    }

    public removeFakeItem(t: T): void {
        this._items = this._items.filter(item => !this.compareFakeItems(item, t));
    }

    protected findItem(t: T): { foundedItem: T | undefined; index: number | undefined } {
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

    abstract compareFakeItems(a: T, b: T): boolean;
}
