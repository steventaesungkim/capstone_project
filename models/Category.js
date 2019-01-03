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
    
    // Gets all records from Categories table
    // Returns an array of Category class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM categories`
            )
            .then(catArray => {
                const instanceArray = catArray.map(catObj => {
                    return new Category(catObj.id, catObj.category, catObj.levels, catObj.id_user);
                });
                return instanceArray;
            });
    }

    // Get individual record from Categories table for a specific ID
    // Returns a Category class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM categories WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Category(result.id, result.category, result.levels, result.id_user);
            });
        }

    // Gets all records from Categories table for a specific User ID
    // Returns an array of Category IDs for all categories the user owns
    static getByUserID(userID) {
        return db.any(`
                SELECT id FROM categories WHERE id_user = $1`,
                [userID]
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
                UPDATE categories SET name=$2 WHERE id=$1`,
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
                UPDATE categories SET username=$2 WHERE id=$1`,
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
                UPDATE categories SET avatar=$2 WHERE id=$1`,
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
                UPDATE categories SET pwhash=$2 WHERE id=$1`,
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
                DELETE FROM categories WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific user by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM categories WHERE id = $1`,
                [id]
        );
    }

    // === ===  DELETE  === ===  [[END]]



}
module.exports = Category;
