`use strict`

const StatusCode = {
    FORBIDDEN: -1,
    CONFLICT: -1,
    NOTFOUND: -2,
    EXISTED: -1,
    UNAUTHORIZED: -1
}

const Code = {
    FORBIDDEN: 400,
    CONFLICT: 409,
    NOTFOUND: 404,
    EXISTED: 303,
    UNAUTHORIZED: 401
}

const ReasonStatuscode = {
    FORBIDDEN: 'Bad Request',
    CONFLICT: 'Conflict Error',
    NOTFOUND: 'Notfound Error',
    EXISTED: 'Data existed',
    UNAUTHORIZED: 'Not authenticated'
}

class ErrorResponse extends Error {

    constructor(message, DT = "", EM, EC, status) {
        super(message)
        this.DT = DT
        this.EM = message ? message : EM
        this.EC = EC
        this.status = status
        // console.log(`EC: ${EC} - EM: ${EM}`)
    }
    //constructor()
}

class ExistError extends ErrorResponse {

    constructor(message, DT, EM = ReasonStatuscode.EXISTED, EC = StatusCode.EXISTED, status = Code.EXISTED) {
        super(message, DT, EM, EC, status)
        // console.log(`EC: ${EC}`)
    }
}


class NotFoundError extends ErrorResponse {

    constructor(message, DT, EM = ReasonStatuscode.NOTFOUND, EC = StatusCode.NOTFOUND, status = Code.NOTFOUND) {
        super(message, DT, EM, EC, status)
        // console.log(`EC: ${EC}`)
    }
}

class ConflictRequestError extends ErrorResponse {

    constructor(message, DT, EM = ReasonStatuscode.CONFLICT, EC = StatusCode.CONFLICT, status = Code.CONFLICT) {
        super(message, DT, EM, EC, status)
    }
}

class BadRequestError extends ErrorResponse {

    constructor(message, DT, EM = ReasonStatuscode.FORBIDDEN, EC = StatusCode.FORBIDDEN, status = Code.FORBIDDEN) {
        super(message, DT, EM, EC, status)
    }
}

class AuthorizationError extends ErrorResponse {

    constructor(message, DT, EM = ReasonStatuscode.UNAUTHORIZED, EC = StatusCode.UNAUTHORIZED, status = Code.UNAUTHORIZED) {
        super(message, DT, EM, EC, status)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    NotFoundError,
    ExistError,
    AuthorizationError
}