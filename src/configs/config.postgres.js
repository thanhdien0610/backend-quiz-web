`use strict`

const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3055
    },
    db: {
        user: process.env.DEV_DB_USER || 'postgres',
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 5432,
        database: process.env.DEV_DB_DATABASE || 'quizDB',
        password: process.env.DEV_DB_PASSWORD
    }
}

const production = {
    app: {
        port: process.env.PRO_APP_PORT || 3052
    },
    db: {
        user: process.env.PRO_DB_USER || 'postgres',
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 5432,
        database: process.env.PRO_DB_DATABASE || 'quizDB',
        password: process.env.PRO_DB_PASSWORD
    }
}
const config = { dev, production }
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]