export class GeneralError extends Error {
    statusCode;

    constructor ( statusCode, message ){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}