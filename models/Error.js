export default class Error {
    constructor({errorCode = '', message = 'default'} = {}) {

        this.errorCode = errorCode;
        this.message = message;

    }
}