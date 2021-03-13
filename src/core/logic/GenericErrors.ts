/* eslint-disable no-inner-declarations */
/* eslint-disable max-classes-per-file */
import { StatusCodes } from 'http-status-codes';
import GenericAppError from './GenericAppError';

export class NotFound extends GenericAppError {
    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, message || 'Não foi possível encontrar o registro no momento.');
    }
}

export class NotCreated extends GenericAppError {
    constructor(message: string) {
        super(StatusCodes.FORBIDDEN, message || 'Não foi permitido executar essa ação no momento.');
    }
}

export class NotAuthorized extends GenericAppError {
    constructor(message: string) {
        super(StatusCodes.UNAUTHORIZED, message || 'Sem permissão para executar essa ação.');
    }
}

export class Unexpected extends GenericAppError {
    constructor(message: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message || 'Não foi possível realizar a requisição');
    }
}

export class InvalidParam extends GenericAppError {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message || 'Um ou mais campos da requisição parecem estar incorretos');
    }
}
