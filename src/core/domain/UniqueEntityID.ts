import { v4 as uuid } from 'uuid';
import Identifier from './Identifier';

export default class UniqueEntityID extends Identifier<string | number> {
    constructor(id?: string) {
        super(id || uuid());
    }
}
