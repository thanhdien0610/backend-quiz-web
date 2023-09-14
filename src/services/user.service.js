const { Model } = require('sequelize');
const db = require('../models/index');
const { getTime } = require('../utils');
const { Op } = require("sequelize")
class UserService {

    static findUserById = async (id) => {
        return await db.Participant.findOne({
            where: {
                id: id,
            }
        });
    }

    static findUserByEmail = async (email) => {
        return await db.Participant.findOne({
            where: {
                email: email,
            },
            paranoid: false
        });
    }

    static findUserByUsername = async (username) => {
        return await db.Participant.findOne({
            where: {
                username: username,
            },
            paranoid: false
        });
    }

    static getKeyTokenByUserId = async (id) => {
        return await db.KeyToken.findOne({
            where: {
                participant_id: id
            }
        });
    }

    static updateInfo = async (id, username, role, userImage) => {
        return await db.Participant.update({
            username: username,
            role: role,
            userImage: userImage
        }, {
            where: {
                id: id
            }
        });
    }

    static updateRefreshToken = async (refreshToken, userId) => {
        // console.log(refreshToken, ' :: ', userId)
        return await db.Participant.update({
            refresh_token: refreshToken,
            refresh_expired: getTime({ jwt: refreshToken })
        }, {
            where: {
                id: userId
            }
        });
    }

    static deleteRefreshToken = async (userId) => {
        return await db.Participant.update({
            refresh_token: null,
            refresh_expired: null
        }, {
            where: {
                id: userId
            }
        });
    }

    static deleteUser = async (id) => {
        return await db.Participant.destroy({
            where: {
                id: id
            }
        })
    }

    static getAllUser = async () => {
        return await db.Participant.findAndCountAll()
    }

    static getUserWithPaginate = async (page, limit) => {
        const maxLimit = await db.Participant.count()
        console.log(`maxlimit ${maxLimit}`)
        return await db.Participant.findAndCountAll({
            offset: (page - 1) * limit,
            limit: limit > maxLimit ? maxLimit : limit
        })
    }
}
module.exports = UserService;