`use strict`

const AuthService = require("../services/auth.service");
const { OK, CREATED } = require('../core/success.response')
class AuthController {
    registerUser = async (req, res, next) => {
        console.log(`[P]::SIGN UP::`, req.body);
        new CREATED({
            EM: `A new user created success`,
            DT: await AuthService.signUp(req.body)
        }).send(res);
        //return res.status(200).json(await AuthService.signUp(req.body))

    };

    loginUser = async (req, res, next) => {
        console.log(`[P]::SIGN IN::`, req.body);
        new OK({
            EM: `Login succeed`,
            DT: await AuthService.signIn(req.body)
        }).send(res)
        // return res.status(200).json(await AuthService.signIn(req.body))
    };
    requestRefreshToken = async (req, res, next) => {
        console.log(`[P]::REFRESH TOKEN::`, req.body);
        new CREATED({
            EM: `Get Refresh Token succeed`,
            DT: await AuthService.requestRefreshToken(req.body)
        }).send(res)

    };

    logoutUser = async (req, res, next) => {
        console.log(`[P]::LOG OUT::`, req.body)
        new OK({
            EM: `LogOut succeed`,
            DT: await AuthService.logOut(req.body)
        }).send(res)
    };

    overView = async (req, res, next) => {
        console.log(`[P]::GET OVERVIEW::`)
        new OK({
            EM: `Get Dashboard Overview succeed`,
            DT: await AuthService.getOverView()
        }).send(res)
    };


}

module.exports = new AuthController();