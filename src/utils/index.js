// `use strict`

const _ = require('lodash')
const jwtDecode = require('jwt-decode')
const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
}

const responseCode = ({ DT = "", EC = 0, EM = "" }) => {
    return {
        "DT": DT,
        "EC": EC,
        "EM": EM
    }
}

const getTime = ({ jwt }) => {
    const token = jwtDecode(jwt)
    const date = new Date(0);
    return new Date(token.exp * 1000)
}
module.exports = {
    getInfoData,
    responseCode,
    getTime
}