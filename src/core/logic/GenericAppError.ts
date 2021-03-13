interface IGenericAppError {
    statusCode: number;
    message: string;
}

export default abstract class GenericAppError implements IGenericAppError {
    public readonly statusCode: number;

    public readonly message: string;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
