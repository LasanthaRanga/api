const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(cors());

const sequlize = require('./util/sequl');
const userRouter = require('./router/user');
const tempStudentRouter = require('./router/temp_student');
const courseRouter = require('./router/corse');
const addressRouter = require('./router/address');





app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/user', userRouter);
app.use('/tempStudent', tempStudentRouter);
app.use('/course', courseRouter);
app.use('/address', addressRouter);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log(error.message);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;