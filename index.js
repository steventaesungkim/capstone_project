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

// passwordDoesMatch(thePassword) {
//     const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
//     return didMatch;
// }

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
const Question = require('./models/Question');
const Result = require('./models/Result');

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
    const newName = req.body.name.toUpperCase();
    const newUsername = req.body.username.toUpperCase();
    const newPassword = req.body.password.toUpperCase();
    const newAvatar = req.body.avatar.toUpperCase();
    User.createUser(newName, newUsername, newPassword, newAvatar)
        .catch(err => {
            console.log(err);
            // res.json(message='Username exist');
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
    const theUserName = req.body.username.toUpperCase();
    const thePassword = req.body.password.toUpperCase();
    // console.log(req.body)
    console.log(theUserName)
    console.log(thePassword)
    User.getByUserName(theUserName)
        // console.log(theUserName)
        .catch(err => {
            // console.log(err);
            res.json(message='Invalid Username');
        })
        .then(theUser => {
            console.log(theUser)
            if (theUser.passwordDoesMatch(thePassword)) {
                req.session.user = theUser;
                res.json(theUser);
            } else {
                res.json(message='Invalid Password');
                // console.log('Invalid info.')
            }
        });
});

// ========================================================

// ========================================================
// Signout / Kill User Session
// ========================================================

app.get('/api/user/isValid', (req, res) =>{
    let isLoggedIn = req.session.user ? true : false;
    res.json({
        isLoggedIn
    })
})

app.post('/api/user/logout', (req, res) => {
    // 1. destroy the session
    req.session.destroy(() => {
        req.session = null;
    });
    res.json({message: "Successfully logged out"});
});

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

    Category.createUser(newCategoryType, newLevel, newIdUser)
        .catch(err => {
            console.log(err);
            res.send(err);
        })
        .then(newCategory => {
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
    Category.getById(req.params.id_user)
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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Question
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ========================================================
// Create a Question
// ========================================================

app.post('/api/question/create', (req, res) =>{
    const newLevel = req.body.level;
    const newQuestion = req.body.question;
    const newAnswer = req.body.answer;
    
    Question.createQuestion(newLevel, newQuestion, newAnswer, id_category)
        .catch(err =>{
            console.log(err);
            res.send(err);
        })
        .then(newQuestion =>{
            res.json(newQuestion);
        })
})

// ========================================================

// ========================================================
// Get all Questions
// ========================================================

app.get('/api/question', (req, res) => {
    Question.getAll()
    .then(allQuestion => {
        console.log(allQuestion);
        res.json(allQuestion);
    });
});

// ========================================================

// ========================================================
// Get Question by ID 
// ========================================================

app.get('/api/question/:id(\\d+)', (req, res) => {
    Question.getById(req.params.id)
    .then(question => {
        res.json(question);
    });
});

// ========================================================

// ========================================================
// Get Questions by Category's ID 
// ========================================================

app.get('/api/question/:id_category(\\d+)', (req, res) => {
    Question.getByCategory(req.params.id_category)
    .then(category => {
        res.json(category);
    });
});

// ========================================================

// ========================================================
// Get Questions by Category's ID and Level
// ========================================================
// DOUBLE CHECK

app.get('/api/question/:id_category(\\d+)/:level', (req, res) => {
    const selectedLevel = req.params.level;

    Question.getByLevel(req.params.id_category, selectedLevel, true)
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    .then(questionLevel => {
        res.json(questionLevel);
    });
});

// ========================================================
// Update Question
// ========================================================

app.post('/api/question/update/:id(\\d+)', (req,res) =>{
    Question.getById(req.params.id)
        .then(theQuestion =>{
            theQuestion.level = req.body.level
            theQuestion.question = req.body.question
            theQuestion.answer = req.body.answer
            theQuestion.update()
        })
        .then(updatedQuestion =>{
            res.json(updatedQuestion)
        })
})

// ========================================================

// ========================================================
// Delete Question by ID 
// ========================================================

app.delete('/api/question/:id(\\d+)', (req, res) => {
    Question.deleteById(req.params.id)
    .then(theQuestion => {
        theQuestion.delete()
        .then(delQuestion => {
            res.json(delQuestion);
        });
    });
});

// ========================================================

// ========================================================
// Delete Question by Level using ID 
// ========================================================

app.delete('/api/question/:id_category(\\d+)/:level', (req, res) => {
    Question.deleteByLevel(req.params.id_category, req.body.level)
    .then(theLevelQuestion => {
        theLevelQuestion.delete()
        .then(delLevelQuestion => {
            res.json(delLevelQuestion);
        });
    });
});

// ========================================================

// ========================================================
// Delete Questions by Category using ID 
// ========================================================

app.delete('/api/question/:id_category(\\d+)', (req, res) => {
    Question.deleteByCategory(req.params.id_category)
    .then(theLevelQuestion => {
        theLevelQuestion.delete()
        .then(delLevelQuestion => {
            res.json(delLevelQuestion);
        });
    });
});

// ========================================================


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Results
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// ========================================================
// Create a Result
// ========================================================

app.post('/api/result/:id_resultset/:id_question', (req, res) =>{
    const resultSetId = req.params.id_resultset;
    const questionId = req.params.id_question;
    const isCorrect = req.body.correct;
    
    Result.createResult(resultSetId, questionId, isCorrect)
        .catch(err =>{
            console.log(err);
            res.send(err);
        })
        .then(newResult =>{
            res.json(newResult);
        })
})

// ========================================================

// ========================================================
// Get all Result
// ========================================================

app.get('/api/result', (req, res) => {
    Result.getAll()
    .then(allResult => {
        console.log(allResult);
        res.json(allResult);
    });
});

// ========================================================

// ========================================================
// Get Result by ID 
// ========================================================

app.get('/api/result/:id(\\d+)', (req, res) => {
    Result.getById(req.params.id)
    .then(result => {
        res.json(result);
    });
});

// ========================================================

// ========================================================
// Get all Results by ResultSet ID 
// ========================================================

app.get('/api/result/:resultsetID', (req, res) => {
    Result.getByResultSet(req.params.resultsetID, true)
    .then(result => {
        res.json(result);
    });
});

// ========================================================

// ========================================================
// Get Results by Question ID
// ========================================================

app.get('/api/result/:qID', (req, res) => {
    Result.getByQuestion(req.params.qID, true)
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    .then(result => {
        res.json(result);
    });
});

// ========================================================
// Update Result
// ========================================================

app.post('/api/Result/update/:id(\\d+)', (req,res) =>{
    Result.getById(req.params.id)
        .then(theResult =>{
            theResult.correct = req.body.correct
            theResult.update()
        })
        .then(updateResult =>{
            res.json(updateResult)
        })
})

// ========================================================

// ========================================================
// Delete by ID 
// ========================================================

app.delete('/api/result/:id(\\d+)', (req, res) => {
    Result.deleteById(req.params.id)
    .then(theResult => {
        theResult.delete()
        .then(delResult => {
            res.json(delResult);
        });
    });
});

// ========================================================

// ========================================================
// Delete ResultSet by ResultSet ID 
// ========================================================

app.delete('/api/result/:id_resultset', (req, res) => {
    Result.deleteByResultSet(req.params.id_resultset)
    .then(theResult => {
        theResult.delete()
        .then(delResult => {
            res.json(delResult);
        });
    });
});

// ========================================================

// ========================================================
// Delete Result by question using ID 
// ========================================================

app.delete('/api/result/:id_question', (req, res) => {
    Result.deleteByCategory(req.params.id_question)
    .then(theResult => {
        theResult.delete()
        .then(delResult => {
            res.json(delResult);
        });
    });
});

// ========================================================


