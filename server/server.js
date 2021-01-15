require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Handle all routes in one file 'index.js' for import convinience.
const routes = require('./routes/index');

// Importing the authentication middleware.
const passport = require('./middleware/passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Сross-origin resource sharing permission.
app.use(cors());

// Working with user identity.
app.use('/api/', routes.signinRoute, routes.signupRoute, routes.verifyEmailRoute);

// Locking all private routes globally with help of 'passport' middleware.
app.use(passport.authenticate('jwt', { session: false }));
app.use('/api/', routes.exerciseRoute, routes.userRoute, routes.workoutRoute);

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