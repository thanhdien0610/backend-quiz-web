`use strict`

const express = require('express');
const { asyncHandler } = require('../../auth/authCheck');
var multer = require('multer');
var upload = multer();
const participantController = require('../../controllers/participant.controller');

const router = express.Router();

//, (req, res) => {
//     req.fields,
//         req.files
// }

//GET ALL USERS
router.get("/all", asyncHandler(participantController.getAllParticipant))

//create user - use form-data
router.post('/', upload.none(), asyncHandler(participantController.postCreateParticipant))

//UPDATE USER
router.put('/', upload.none(), asyncHandler(participantController.putUpdateParticipant))

//DELETE USER
router.delete('/', asyncHandler(participantController.deleteUser))

//GET USER WITH PAGINATE
router.get('/', asyncHandler(participantController.getUserWithPaginate))

//hello
// router.get("/", (req, res) => {
//     return res.status(200).json({
//         message: 'Welcome from participant'
//     })
// })

module.exports = router;