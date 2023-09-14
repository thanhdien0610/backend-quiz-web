const { ExistError, ConflictRequestError, NotFoundError } = require("../core/error.response");
const { getInfoData } = require("../utils");
const UserService = require("./user.service");
const _ = require('lodash')
const bcrypt = require('bcrypt');
const db = require('../models/index');
const KeyTokenService = require('../services/keyToken.service')
const crypto = require('node:crypto');
class ParticipantService {
    static getListUser = async () => {
        const listUser = await UserService.getAllUser();
        const output = []
        for (let i = 0; i < listUser.rows.length; i++) {
            if (!_.isNull(listUser.rows[i].dataValues.image)) {
                listUser.rows[i].dataValues.image = listUser.rows[i].dataValues.image.toString('base64')
            }
            output.push(listUser.rows[i].dataValues)
        }
        return output
    }

    static getListUserWithPaginate = async (page, limit) => {
        const result = await UserService.getUserWithPaginate(page, limit)
        console.log(result)
        const users = []
        for (let i = 0; i < result.rows.length; i++) {
            if (!_.isNull(result.rows[i].dataValues.image)) {
                result.rows[i].dataValues.image = result.rows[i].dataValues.image.toString('base64')
            }
            users.push(result.rows[i].dataValues)
        }
        return {
            "totalRows": result.count,
            "totalPages": Math.ceil(result.count / limit),
            "users": users
        }
    }

    static postCreateNewUser = async ({ email, password, username, role, userImage = null }) => {

        //check exist username
        const holderUser = await UserService.findUserByUsername(username);
        // console.log(holderUser)
        if (holderUser) {
            throw new ExistError(`User with username ${username} already exists`)
        }

        //check exist email 
        const holderEmail = await UserService.findUserByEmail(email);
        if (holderEmail) {
            throw new ExistError(`User with the email ${email} already exists`)
        }
        // console.log(`check email user`)

        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(`check password user`)

        const newUser = await db.Participant.create({
            username, email, password: passwordHash, role, userImage
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

            return getInfoData({ fields: ['id', 'username', 'role', 'email', 'createdAt'], object: newUser })
        }
    }

    static putUpdateUser = async ({ id, username, role, userImage = null }) => {

        //check exist id
        const holderUser = await UserService.findUserById(id);

        if (!holderUser) {
            throw new NotFoundError(`Nothing to update`, {
                id, username, role, userImage
            })
        }

        const updatedUser = await UserService.updateInfo(id, username, role, userImage)
        if (updatedUser) {
            return {
                id, username, role, userImage
            }
        }
    }

    static deleteUser = async ({ id }) => {
        if (!id) {
            throw new NotFoundError(`Invalid Input Id`)
        }

        //check exist id
        const holderUser = await UserService.findUserById(id);

        if (holderUser) {
            const deletedUser = await UserService.deleteUser(id)
            if (deletedUser) {
                return {
                    id
                }
            }
        }


        return { id }
    }
}

module.exports = ParticipantService