'use strict'

const JWT = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { AuthorizationError } = require('../core/error.response');
const TIME_expiresIn_ACCESS_TOKEN = '2 days';
const TIME_expiresIn_REFRESH_TOKEN = '7 days';
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const access_token = await JWT.sign(payload, publicKey, {
            expiresIn: TIME_expiresIn_ACCESS_TOKEN
        })

        const refresh_token = await JWT.sign(payload, privateKey, {

            expiresIn: TIME_expiresIn_REFRESH_TOKEN
        })

        //decode

        JWT.verify(access_token, publicKey, (err, decode) => {
            if (err) {
                console.error(`error verify::`, err)
            } else {
                console.log(`decode verify::`, decode)
            }
        })
        return { access_token, TIME_expiresIn_ACCESS_TOKEN, refresh_token, TIME_expiresIn_REFRESH_TOKEN }

    } catch (error) {

    }
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        throw new AuthorizationError(`Not authenticated the user`)
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1];
    const verifyToken = jwt_decode(token);
    if (!verifyToken) {
        throw new AuthorizationError(`Not authenticated the user`)
    }
    next()
}

module.exports = {
    createTokenPair,
    verifyAccessToken
}