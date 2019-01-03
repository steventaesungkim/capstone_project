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

    // === ===  CREATE  === ===  [[START]]

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
    // === ===  CREATE  === ===  [[END]]


    // === ===  RETRIEVE  === ===  [[START]]
    
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

    // Gets all records from Users table for a specific Avatar
    // Returns an array of IDs for all users that use the specific Avatar
    static getByAvatar(avatar) {
        return db.any(`
                SELECT id FROM users WHERE avatar = $1`,
                [avatar]
            )
            .then(result => {
                return result.map(r => r.id);
            });
    }

    // === ===  RETRIEVE  === ===  [[END]]


    // === ===  UPDATE  === ===  [[START]]
    // Updates the name for THIS user
    // Returns boolean True if successful, False if unsuccessful
    updateName(name) {
        return db.result(`
                UPDATE users SET name=$2 WHERE id=$1`,
                [this.id, name]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the username for THIS user
    // Returns boolean True if successful, False if unsuccessful
    updateUsername(username) {
        return db.result(`
                UPDATE users SET username=$2 WHERE id=$1`,
                [this.id, username]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the avatar for THIS user
    // Returns boolean True if successful, False if unsuccessful
    updateAvatar(avatar) {
        return db.result(`
                UPDATE users SET avatar=$2 WHERE id=$1`,
                [this.id, avatar]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the password for THIS user
    // Returns boolean True if successful, False if unsuccessful
    updatePassword(password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return db.result(`
                UPDATE users SET pwhash=$2 WHERE id=$1`,
                [this.id, hash]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // === ===  UPDATE  === ===  [[END]]

    
    // === ===  DELETE  === ===  [[START]]
    // DELETE
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
    // === ===  DELETE  === ===  [[END]]


    // NEED TO CONFIRM HOW/WHY THIS IS NEEDED
    static from(userObj) {
        const id = userObj.id;
        const name = userObj.name;
        const username = userObj.iusernamed;        // is this correct????
        const pwhash = userObj.pwhash;
        return new User(id, name, username, pwhash);  // could eliminate the consts
    }
    
    
    passwordDoesMatch(thePassword) {
        const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
        return didMatch;
    }


}
module.exports = User;
