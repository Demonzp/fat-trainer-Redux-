require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сross-origin resource sharing permission.
app.use(cors());

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/index');

app.use('/api/',
    routes.exerciseRoute,
    routes.signinRoute,
    routes.signupRoute,
    routes.userRoute,
    routes.verifyEmailRoute,
    routes.workoutRoute
);

// Server start and connect to DB.
(async function () {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server listening on port ${process.env.APP_PORT}.`);
        })
    } catch (err) {
        console.error(`Connection failed: ${process.env.DB_CONNECT}`, err);
    }
}());