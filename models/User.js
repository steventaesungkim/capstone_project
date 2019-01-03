const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor(id, name, username, pwhash, avatar) {
        this.id = id;
        this.username = username;
        this.pwhash = pwhash;
        this.name = name;
        this.avatar = avatar;
    }

    // === ===  CREATE  === ===
    // Inserts a new record in the Users table after bcrypting password
    // Returns a new instance of the User class
    static createUser(name, username, password, avatar) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return db.one(`
                INSERT INTO users 
                    (name, username, pwhash, avatar)
                VALUES 
                    ($1, $2, $3, $4)
                RETURNING id`,
                [name, username, hash, avatar]
            )
            .then(data => {
                return new User(data.id, name, username, hash, avatar);
            });
    }


    // === === RETRIEVE === ===
    
    // Gets all records from Users table
    // Returns an array of User class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM users`
            )
            .then(userArray => {
                const instanceArray = userArray.map(userObj => {
                    return new User(userObj.id, userObj.name, userObj.username, userObj.pwhash, userObj.avatar);
                });
                return instanceArray;
            });
    }

    // Get individual record from Users table for a specific ID
    // Returns a User class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM users WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new User(result.id, result.name, result.username, result.pwhash, result.avatar);
            });
        }
        
    // Get individual record from Users table for a specific Username
    // Returns a User class instance
    static getByUserName(username) {
        return db.one(`
                SELECT * FROM users WHERE username = $1`,
                [username]
            )
            .then(result => {
                return new User(result.id, result.name, result.username, result.pwhash, result.avatar);
            });
    }

    // NEED TO CONFIRM HOW/WHY THIS IS NEEDED
    static from(userObj) {
        const id = userObj.id;
        const name = userObj.name;
        const username = userObj.iusernamed;        // is this correct????
        const pwhash = userObj.pwhash;
        return new User(id, name, username, pwhash);  // could eliminate the consts
    }

    
    static getByAvatar(avatar) {
        return db
            .one('select * from users where avatar = $1', [avatar])
            .then(result => {
                // console.log('look at my', result.id);
                return result.id;
            });
    }

    

    // getReminders() {
    //     return db.any(
    //         `select reminder, id from reminders
    //     where user_id = $1`,
    //         [this.id]
    //     );
    // }
    passwordDoesMatch(thePassword) {
        const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
        return didMatch;
    }
    // UPDATE (working)
    updateName(name) {
        this.name = name;
        return db
            .result(
                `update users
                    set name=$2
                    where id=$1`,
                [this.id, name]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // DELETE (working)
    delete() {
        return db.result(
            `delete from users
        where id = $1`,
            [this.id]
        );
    }
    static deleteById(id) {
        return db.result(
            `delete from users
        where id = $1`,
            [id]
        );
    }
}
module.exports = User;
