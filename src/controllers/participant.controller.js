`use strict`

const { OK, CREATED } = require("../core/success.response");
const ParticipantService = require("../services/participant.service");

class ParticipantController {
    getAllParticipant = async (req, res, next) => {
        console.log(`[P]::GET ALL USERS::`)
        new OK({
            EM: `GetAll list participants succeed`,
            DT: await ParticipantService.getListUser()
        }).send(res)
    };
    getUserWithPaginate = async (req, res, next) => {
        let page = req.query.page;
        let limit = req.query.limit;
        console.log(`[P]::GET USERS WITH PAGINATE:: page: ${page}  and limit: ${limit}`)
        new OK({
            EM: `Get list participants succeed`,
            DT: await ParticipantService.getListUserWithPaginate(page, limit)
        }).send(res)
    }
    postCreateParticipant = async (req, res, next) => {
        console.log(`[P]::POST CREATE USER:: `)
        const obj = JSON.parse(JSON.stringify(req.body))
        new CREATED({
            EM: `Create a new participant succeed`,
            DT: await ParticipantService.postCreateNewUser(obj)
        }).send(res)
    };
    putUpdateParticipant = async (req, res, next) => {
        console.log(`[P]::PUT UPDATE USER::`)
        const obj = JSON.parse(JSON.stringify(req.body))
        new OK({
            EM: `Update the participant succeed`,
            DT: await ParticipantService.putUpdateUser(obj)
        }).send(res)
    };
    deleteUser = async (req, res, next) => {
        console.log(`[P]::DELETE USER::`)
        new OK({
            EM: `Delete the user succeed`,
            DT: await ParticipantService.deleteUser(req.body)
        }).send(res)
    };



}


module.exports = new ParticipantController()