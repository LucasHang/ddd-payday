import { v4 as uuid } from 'uuid';
import Identifier from './Identifier';

class UniqueEntityID extends Identifier<string | number> {
    constructor(id?: string | number) {
        super(id || uuid());
    }
}

export default UniqueEntityID;
