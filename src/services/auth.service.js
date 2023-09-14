`use strict`
const { createTokenPair } = require('../auth/authUtils');
const crypto = require('node:crypto');
const { getInfoData, responseCode } = require('../utils');
const bcrypt = require('bcrypt');
const db = require('../models/index');
const KeyTokenService = require('./keyToken.service');
const _ = require('lodash');

const UserService = require('./user.service');
const { BadRequestError, NotFoundError, ExistError, ConflictRequestError } = require('../core/error.response');
const QuizService = require('./quiz.service');
class AccessService {

    static signUp = async ({ username, email, password, role = 'USER' }) => {

        //check exist username 
        const holderUser = await UserService.findUserByUsername(username);
        // console.log(holderUser)
        if (holderUser) {
            throw new ExistError(`User with username ${username} already exists`)
        }
        // console.log(`check xong user`)
        //check exist email 
        const holderEmail = await UserService.findUserByEmail(email);
        if (holderEmail) {
            throw new ExistError(`User with the email ${email} already exists`)
        }
        // console.log(`check email user`)

        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(`check password user`)

        const newUser = await db.Participant.create({
            username, email, password: passwordHash, role
        });

        if (newUser) {
            // created privateKey, publicKey
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newUser.id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                throw new ConflictRequestError(`publicKeyString error`)
            }

            return ""
        }


    }

    static signIn = async ({ email, password }) => {

        //check exist email 

        const holderEmail = await UserService.findUserByEmail(email);
        // console.log(holderEmail)

        if (!holderEmail) {
            throw new BadRequestError(`Not found user with the email: ${email}`)
        }
        // console.log(holderEmail)

        //compare password
        const validPassword = await bcrypt.compare(password, holderEmail.password);
        if (!validPassword) {
            throw new NotFoundError(`Incorrect password`)
        }

        // console.log(holderEmail)
        const holderKey = await UserService.getKeyTokenByUserId(holderEmail.id);
        // console.log(holderKey)

        //created token pair    
        const tokens = await createTokenPair({
            role: holderEmail.role, email
        },
            holderKey.public_key,
            holderKey.private_key);
        // console.log(`Created tokens success:: `, tokens)
        // console.log(`created token`)
        const addRefreshToken = await UserService.updateRefreshToken(tokens.refresh_token, holderEmail.id);
        if (!addRefreshToken) {
            throw new ConflictRequestError(`Error with token`)
        }
        // console.log(`add token`)
        //succeed login
        return _.merge(
            getInfoData({ fields: ['username', 'role', 'email', 'image'], object: holderEmail }),
            getInfoData({ fields: ['access_token', 'refresh_token'], object: tokens }))



    }

    static logOut = async ({ email, refresh_token }) => {

        //validate input
        if (!email || !refresh_token) {
            throw new BadRequestError(`Invalid Input Email/Refresh_token`)
        }

        //check exist email 
        const holderEmail = await UserService.findUserByEmail(email);

        if (!holderEmail) {
            throw new NotFoundError(`Invalid Refresh_token/Email`, { email, refresh_token })
        }

        // console.log(holderEmail)
        //check exist refresh token
        const currentDate = new Date();
        if (!holderEmail.refresh_token
            || (holderEmail.refresh_expired.getTime() < currentDate.getTime())
            || (holderEmail.refresh_token !== refresh_token)) {
            throw new NotFoundError(`Invalid Refresh_token/Email`, { email, refresh_token })
        }

        const userLogout = await UserService.deleteRefreshToken(holderEmail.id);
        return { email, refresh_token }
    }

    static requestRefreshToken = async ({ email, refresh_token }) => {

        //check valid email and refresh_token
        if (!email || !refresh_token) {
            throw new BadRequestError(`Invalid Input Email/Refresh_token`)
        }
        //check exist email 
        const holderEmail = await UserService.findUserByEmail(email);

        if (!holderEmail) {
            throw new NotFoundError(`Invalid Refresh_token/Email`, { email, refresh_token })
        }

        // console.log(holderEmail)
        //check exist refresh token
        const currentDate = new Date();
        if (!holderEmail.refresh_token
            || (holderEmail.refresh_expired.getTime() < currentDate.getTime())
            || (holderEmail.refresh_token !== refresh_token)) {
            throw new NotFoundError(`Invalid Refresh_token/Email`, { email, refresh_token })
        }

        const holderKey = await UserService.getKeyTokenByUserId(holderEmail.id);
        // console.log(holderKey)

        //created token pair    
        const tokens = await createTokenPair({
            role: holderEmail.role, email
        },
            holderKey.public_key,
            holderKey.private_key);
        // console.log(`Created tokens success:: `, tokens)

        const addRefreshToken = await UserService.updateRefreshToken(tokens.refresh_token, holderEmail.id);
        if (!addRefreshToken) {
            throw new ConflictRequestError(`Error with token`)
        }

        return getInfoData({ fields: ['access_token', 'refresh_token'], object: tokens })

    }

    static getOverView = async () => {
        const listUser = await UserService.getAllUser();
        // console.log(listUser.count)
        let countUsers = 0, countAdmin = 0;
        for (let i = 0; i < listUser.rows.length; i++) {
            if (listUser.rows[i].dataValues.role === 'USER') {
                countUsers++;
            }
            if (listUser.rows[i].dataValues.role === 'ADMIN') {
                countAdmin++;
            }
        }

        const countQuiz = await QuizService.getCountQuiz();
        const countQuestions = await QuizService.getCountQuestion();
        const countAnswers = await QuizService.getCountAnswers();
        return {
            "users": {
                "total": listUser.count,
                "countUsers": countUsers,
                "countAdmin": countAdmin
            },
            "others": {
                "countQuiz": countQuiz,
                "countQuestions": countQuestions,
                "countAnswers": countAnswers
            }
        }
    }
}

module.exports = AccessService