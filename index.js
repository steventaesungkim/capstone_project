require('dotenv').config();

// Required Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
// const db = require('./models/db');

// app.use(session({
//     store: new pgSession({pgPromise: db}),
//     secret: 'bingbong0987654321234567890',
//     saveUninitialized: false,
//     cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
//     })
// );

// Views and CSS
app.use(express.static('public'));
// const coverPage = require('./views/coverPage');
// const page = require('./views/page');
// const helper = require('./views/helper');
// const registerForm = require('./views/registerForm');
// const loginForm = require('./views/loginForm');
// const homePage = require('./views/home');


// Model Variables
const User = require('./models/User');


// // ========================================================
// // Protects Routes
// // ========================================================

// function protectRoute(req, res, next) {
//     let isLoggedIn = req.session.user ? true : false;
//     if (isLoggedIn) {
//         next();
//     } else {
//         res.redirect('/login');
            // need to create something that will send a message that
            // says you do not have the data or you have the data in midware
//     }
// }

// app.use((req, res, next) => {
//     let isLoggedIn = req.session.user ? true : false;
//     console.log(req.session.user);
//     console.log(`On ${req.path}, is a user logged in? ${isLoggedIn}`);

//     next();
// });

// app.get('/', (req, res) => {
//     const coverPg = coverPage();
//     res.send(coverPg);
// });

// ========================================================


// ========================================================
// Register
// ========================================================

app.post('/api/user/register', (req, res) => {
    console.log(req.body);
    const newName = req.body.name;
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    const newAvatar = req.body.avatar;
    User.createUser(newName, newUsername, newPassword, newAvatar)
        .catch(err => {
            console.log(err);
            res.send(err);
        })
        .then(newUser => {
            req.session.user = newUser;
            res.json(newUser);
        });
});

// // ========================================================


// ========================================================
// Login (working)
// ========================================================

app.post('/api/user/login', (req, res) => {
    const theUserName = req.body.username;
    const thePassword = req.body.password;
    User.getByUserName(theUserName)
        .catch(err => {
            console.log(err);
            res.send(err);
        })
        .then(theUser => {
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                res.json(theUser);
            } else {
                res.send(err);
            }
        });
});

// // ========================================================


// ========================================================
// Signout / Kill User Session
// ========================================================

// app.post('/logout', (req, res) => {
//     // 1. destroy the session
//     req.session.destroy(() => {
//         req.session = null;
//         res.redirect('/login');
//     });
//     // 2. redirect them to the home page
// });

// // ========================================================

// ========================================================
// Get All Users (working)
// ========================================================

app.get('/api/user', (req, res) => {
    User.getAll()
    .then(allUsers => {
        console.log(allUsers);
        res.json(allUsers);
    });
});

// ========================================================

// ========================================================
// Get User by ID (working)
// ========================================================

app.get('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(user => {
        res.json(user);
    });
});

// ========================================================

// ========================================================
// Get User by Username (working)
// ========================================================

app.get('/api/user/:username', (req, res) => {
    User.getByUserName(req.params.username)
    .then(username => {
        res.json(username);
    });
});

// ========================================================

// ========================================================
// Update User's Name (working)
// ========================================================

app.post('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(theUser => {
        theUser.updateName(req.body.name)
        .then(nameUpdated => {
            res.json(nameUpdated);
        });
    });
});

// ========================================================

// ========================================================
// Delete User (working)
// ========================================================

app.delete('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(theUser => {
        theUser.delete()
        .then(delUser => {
            res.json(delUser);
        });
    });
});

// ========================================================

app.listen(5000, () => {
    console.log('express app is ready.');
});
