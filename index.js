require('dotenv').config();

// Required Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./models/db');

// app.use(session({
//     store: new pgSession({pgPromise: db}),
//     secret: 'bingbong0987654321234567890',
//     saveUninitialized: false,
//     cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
//     })
// );

// Views and CSS
// app.use(express.static('public'));
// const coverPage = require('./views/coverPage');
// const page = require('./views/page');
// const helper = require('./views/helper');
// const registerForm = require('./views/registerForm');
// const loginForm = require('./views/loginForm');
// const homePage = require('./views/home');


// Model Variables
const User = require('./models/User');

// TEST CODE THAT GETS ALL USERS FROM DB
User.getAll()
    .then(a => {
        console.log(a);
    });

// Test Code for adding a new user to the DB
// User.createUser("Mondo", "mdondo", "abc", "coming soon")
//     .then(a => console.log(a))


// TEST CODE FOR DELETE A SPECFIC USER
// User.getAll()
//     .then(a => {
//         console.log(a);
//         console.log("Say bye to Mondo");
//         User.deleteById(8)
//             .then(a => {
//                 User.getAll()
//                     .then(b => console.log(b));
//             })
//         })




// const Location = require('./models/Location');
// const Init_Reminder = require('./models/Init_Reminder');
// const Reminder = require('./models/Reminder');

// function protectRoute(req, res, next) {
//     let isLoggedIn = req.session.user ? true : false;
//     if (isLoggedIn) {
//         next();
//     } else {
//         res.redirect('/login');
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

// // ========================================================
// // Register
// // ========================================================
// app.get('/register', (req, res) => {
//     const theForm = registerForm();
//     // const thePage = page(theForm);
//     res.send(theForm);
// });

// app.post('/register', (req, res) => {
//     console.log(req.body);
//     const newName = req.body.name;
//     const newUsername = req.body.username;
//     const newPassword = req.body.password;
//     const newPhone = req.body.phone_number;
//     User.createUser(newName, newUsername, newPassword, newPhone)
//         .catch(err => {
//             console.log(err);
//             res.redirect('/register');
//         })
//         .then(newUser => {
//             req.session.user = newUser;
//             res.redirect('/home');
//         });
// });

// app.get('/home', protectRoute, (req, res) => {
//     const theHome = homePage();
//     const thePage = page(theHome);
//     res.send(thePage);
// });
// // ========================================================

// // ========================================================
// // Login (working)
// // ========================================================

// app.get('/login', (req, res) => {
//     console.log(req.session.user);
//     // Send login form
//     const theLogin = loginForm();
//     // const thePage = page(theLogin);
//     res.send(theLogin);
// });

// app.post('/login/', (req, res) => {
//     const theUserName = req.body.username;
//     const thePassword = req.body.password;
//     User.getByUserName(theUserName)
//         .catch(err => {
//             console.log(err);
//             res.redirect('/login');
//         })
//         .then(theUser => {
//             if (theUser.passwordDoesMatch(thePassword)) {
//                 req.session.user = theUser;
//                 res.redirect('/home');
//             } else {
//                 res.redirect('/login');
//             }
//         });
// });
// // ========================================================


// // ========================================================
// // Signout / Kill User Session
// // ========================================================
// app.post('/logout', (req, res) => {
//     // 1. destroy the session
//     req.session.destroy(() => {
//         req.session = null;
//         res.redirect('/login');
//     });
//     // 2. redirect them to the home page
// });
// // ========================================================



// // ========================================================
// // Get All Users (working)
// // ========================================================

// // app.get('/users', (req, res) => {
// //     User.getAll().then(allUsers => {
// //         res.send(allUsers);
// //     });
// // });

// // ========================================================

// // ========================================================
// // Get User by Phone (working)
// // ========================================================

// // app.get('/phone/:phone_number', (req, res) => {
// //     User.getByPhone(req.params.phone_number).then(name => {
// //         res.send(name);
// //     });
// // });

// // ========================================================

// // ========================================================
// // Get User by ID (working)
// // ========================================================

// // app.get('/users/:id(\\d+)', (req, res) => {
// //     User.getById(req.params.id).then(user => {
// //         res.send(user);
// //     });
// // });

// // ========================================================

// // ========================================================
// // Get User by Username (working)
// // ========================================================

// // app.get('/users/:username', (req, res) => {
// //     User.getByUserName(req.params.username).then(username => {
// //         res.send(username);
// //     });
// // });
// // ========================================================

// // ========================================================
// // Update User's Name (working)
// // ========================================================

// // app.post('/users/:id(\\d+)', (req, res) => {
// //     User.getById(req.params.id).then(theUser => {
// //         theUser.updateName(req.body.name).then(nameUpdated => {
// //             res.send(nameUpdated);
// //         });
// //     });
// // });

// // ========================================================

// // ========================================================
// // Delete User (working)
// // ========================================================

// // app.delete('/users/:id(\\d+)', (req, res) => {
// //     User.getById(req.params.id).then(theUser => {
// //         theUser.delete().then(delUser => {
// //             res.send(delUser);
// //         });
// //     });
// // });

// // ========================================================

// app.listen(3000, () => {
//     console.log('express app is ready.');
// });
