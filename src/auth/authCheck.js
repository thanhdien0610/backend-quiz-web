`use strict`

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.json({
                message: 'Forbidden Error'

            })
        }

        //check objKey

    } catch (error) {

    }
}

const asyncHandler = fn => {
    return (req, res, next) => {
        // console.log(req)
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    asyncHandler
}