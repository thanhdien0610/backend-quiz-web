require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
// const multer = require('multer');
// const upload = multer();
const app = express()

// console.log(`Process:: `, process.env)
//init middleware
app.use(morgan("dev"));
// app.use(helmet());
app.use(compression());
app.use(express.json())
app.use(express.urlencoded({
    extends: true
}));
// app.use(formidableMiddleware());
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    // credentials: true,

}

app.use(cors(corsOptions));
//init db
require('./dbs/init.postgres.js')

// // for parsing multipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));

//init router
app.use('/', require('./routers/index.js'))

//handling error
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.EC = 404;
    next(error)
})

app.use((error, req, res, next) => {
    // console.log(error.status);
    const statusCode = error.status || 500
    // console.log(error)
    return res.status(statusCode).json({
        DT: error.DT,
        EC: error.EC || 500,
        EM: error.EM || 'Internal Server Error'
    })
})

module.exports = app;
