const createUser = `INSERT INTO public."Participant" (username,email,password,role,"createdAt","updatedAt") VALUES ($1 ,$2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
const getParticipant = `SELECT * FROM public."Participant"`;
const getUserByID = `SELECT * FROM public."Participant" WHERE id = $1`;
const getUserByUserName = `SELECT row_to_json(Participant) FROM public."Participant" WHERE username = $1`;
const deleteUserByID = `DELETE FROM public."Participant" WHERE id = $1`;
const checkEmailExists = `SELECT u FROM  public."Participant" u WHERE u.email = $1`;
const checkUserNameExists = `SELECT u FROM public."Participant" u WHERE u.username =$1`;
// CURRENT_TIMESTAMP
module.exports = {
    createUser,
    getParticipant,
    getUserByID,
    checkEmailExists,
    checkUserNameExists,
    getUserByUserName,
    deleteUserByID
}