`use strict`
const { Sequelize } = require('sequelize');
const Pool = require('pg').Pool;
const { db: { user, host, port, database, password } } = require('../configs/config.postgres')
const pool = new Pool({
    user, host, database, password, port,
});
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres',
    logging: false
});

class Database {
    constructor() {
        this.connect();
    }

    async connect(type = 'postgres') {
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        };
        return Database.instance
    }
}

const instanceMongoDB = Database.getInstance();
module.exports = { instanceMongoDB, pool };




// module.exports = pool;
