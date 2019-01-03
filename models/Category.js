const db = require('./db');

class Category {
    constructor(id, category, levels, id_user) {
        this.id = id;
        this.category = category;
        this.levels = levels;
        this.id_user = id_user;
    }

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Categories table
    // Returns a new instance of the Category class
    static createCategory(category, levels, id_user) {
        return db.one(`
                INSERT INTO categories 
                    (category, levels, id_user)
                VALUES 
                    ($1, $2, $3)
                RETURNING id`,
                [category, levels, id_user]
            )
            .then(data => {
                return new Category (data.id, category, levels, id_user);
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
    
    // Delete THIS user
    delete() {
        return db.result(`
                DELETE FROM users WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific user by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM users WHERE id = $1`,
                [id]
        );
    }

    // === ===  DELETE  === ===  [[END]]



}
module.exports = Category;
