`use strict`

const StatusCode = {
    OK: 0,
    CREATED: 0,

}

const Code = {
    OK: 200,
    CREATED: 201,

}

const ReasonStatuscode = {
    OK: 'Success',
    CREATED: 'Created!',

}

class SuccessResponse {
    constructor({ DT = "", EC = 0, EM = ReasonStatuscode.OK, status = Code.OK }) {
        // this.message = !message ? EM : message
        this.status = status
        this.EC = EC
        this.DT = DT
        this.EM = EM
    }

    send(res, headers = {}) {
        return res.status(this.status).json({
            DT: this.DT,
            EC: this.EC,
            EM: this.EM
        })
    }
}

class OK extends SuccessResponse {
    constructor({ EM, DT }) {
        super({ EM, DT })
    }
}

class CREATED extends SuccessResponse {
    constructor({ EM, DT, status = Code.CREATED }) {
        super({ EM, DT, status })
    }
}

module.exports = {
    OK, CREATED
}
