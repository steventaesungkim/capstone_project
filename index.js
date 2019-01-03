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

app.use(session({
    store: new pgSession({pgPromise: db}),
    secret: 'bingbong0987654321234567890',
    saveUninitialized: false,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}
    })
);

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
const Category = require('./models/Category');

// ========================================================
// Listening 
// ========================================================

app.listen(5000, () => {
    console.log('express app is ready.');
});

// ========================================================
// Protects Routes
// ========================================================

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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// USER
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++


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

// ========================================================

// ========================================================
// Login 
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

// ========================================================

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

// ========================================================

// ========================================================
// Get All Users 
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
// Get User by ID 
// ========================================================

app.get('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(user => {
        res.json(user);
    });
});

// ========================================================

// ========================================================
// Get User by Username 
// ========================================================

app.get('/api/user/:username', (req, res) => {
    User.getByUserName(req.params.username)
    .then(username => {
        res.json(username);
    });
});

// ========================================================

// ========================================================
// Get User by Avatar 
// ========================================================

app.get('/api/user/:avatar', (req, res) => {
    User.getByAvatar(req.params.avatar)
    .then(avatar => {
        res.json(avatar);
    });
});

// ========================================================

// ========================================================
// Update User's Name by ID 
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
// Update User's Username by ID 
// ========================================================

app.post('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(theUser => {
        theUser.updateUsername(req.body.username)
        .then(usernameUpdated => {
            res.json(usernameUpdated);
        });
    });
});

// ========================================================

// ========================================================
// Update User's Avatar by ID 
// ========================================================

app.post('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(theUser => {
        theUser.updateAvatar(req.body.avatar)
        .then(avatarUpdated => {
            res.json(avatarUpdated);
        });
    });
});

// ========================================================

// ========================================================
// Update User's Password by ID 
// ========================================================

app.post('/api/user/:id(\\d+)', (req, res) => {
    User.getById(req.params.id)
    .then(theUser => {
        theUser.updatePassword(req.body.password)
        .then(passwordUpdated => {
            res.json(passwordUpdated);
        });
    });
});

// ========================================================

// ========================================================
// Delete User by ID 
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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CATEGORY
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ========================================================
// Create a Category
// ========================================================

app.post('/api/category/create', (req, res) => {
    console.log(req.body);
    const newCategoryType = req.body.category_type;
    const newLevel = req.body.levels;
    const newIdUser = req.body.id_user;
    Category.createUser(newCategoryType, newLevel, newIdUser, newAvatar)
        .catch(err => {
            console.log(err);
            res.send(err);
        })
        .then(newCategory => {
            // req.session.user = newCategory;
            res.json(newCategory);
        });
});

// ========================================================

// ========================================================
// Get All Categories 
// ========================================================

app.get('/api/category', (req, res) => {
    Category.getAll()
    .then(allCategory => {
        console.log(allCategory);
        res.json(allCategory);
    });
});

// ========================================================

// ========================================================
// Get Categories by ID 
// ========================================================

app.get('/api/category/:id(\\d+)', (req, res) => {
    Category.getById(req.params.id)
    .then(category => {
        res.json(category);
    });
});

// ========================================================

// ========================================================
// Get Categories by User's ID 
// ========================================================

app.get('/api/category/:id_user(\\d+)', (req, res) => {
    Category.getById(req.params.id)
    .then(category => {
        res.json(category);
    });
});

// ========================================================

// ========================================================
// Update Category type by ID 
// ========================================================

app.post('/api/category/:id(\\d+)', (req, res) => {
    Category.getById(req.params.id)
    .then(category => {
        category.updateCategoryType(req.body.category_type)
        .then(categoryTypeUpdated => {
            res.json(categoryTypeUpdated);
        });
    });
});

// ========================================================

// ========================================================
// Update Category level by ID 
// ========================================================

app.post('/api/category/:id(\\d+)', (req, res) => {
    Category.getById(req.params.id)
    .then(category => {
        category.updateLevels(req.body.levels)
        .then(categoryLevelUpdated => {
            res.json(categoryLevelUpdated);
        });
    });
});

// ========================================================

// ========================================================
// Delete Category by ID 
// ========================================================

app.delete('/api/category/:id(\\d+)', (req, res) => {
    Category.getById(req.params.id)
    .then(theCategory => {
        theCategory.delete()
        .then(delCategory => {
            res.json(delCategory);
        });
    });
});

// ========================================================