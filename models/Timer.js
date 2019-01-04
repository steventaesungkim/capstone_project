const db = require('./db');

class Timer {
    constructor(id, time, level, id_category, id_user) {
        this.id = id;
        this.time = time;
        this.level = level;
        this.id_category = id_category;
        this.id_user = id_user;
    }

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Timers table
    // Returns a new instance of the Timer class
    static createTimer(time, level, id_category, id_user) {
        return db.one(`
                INSERT INTO timers 
                    (time, level, id_category, id_user)
                VALUES 
                    ($1, $2, $3, $4)
                RETURNING id`,
                [time, level, id_category, id_user]
            )
            .then(data => {
                return new Timer (data.id, time, level, id_category, id_user);
            });
    }
    // === ===  CREATE  === ===  [[END]]






    

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//         CODE BELOW HAS NOT BEEN UPDATED YET      !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Categories table
    // Returns an array of Category class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM categories`
            )
            .then(catArray => {
                const instanceArray = catArray.map(catObj => {
                    return new Category(catObj.id, catObj.time, catObj.level, catObj.id_user);
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
                return new Category(result.id, result.time, result.level, result.id_user);
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

    // Updates the time for THIS category
    // Returns boolean True if successful, False if unsuccessful
    updateCategoryType(newType) {
        return db.result(`
                UPDATE categories SET time=$2 WHERE id=$1`,
                [this.id, newType]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the level for THIS category
    // Returns boolean True if successful, False if unsuccessful
    updateLevels(newLevels) {       // newLevels should be boolean (true or false)
        return db.result(`
                UPDATE categories SET level=$2 WHERE id=$1`,
                [this.id, newLevels]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Could add an updateUserId for admin purposes, but not needed now

    // === ===  UPDATE  === ===  [[END]]

    
    // === ===  DELETE  === ===  [[START]]
    
    // Delete THIS category
    delete() {
        return db.result(`
                DELETE FROM categories WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific category by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM categories WHERE id = $1`,
                [id]
        );
    }

    // Delete all the categories owned by a specific User ID
    static deleteByUserId(id_user) {
        return db.result(`
                DELETE FROM categories WHERE id_user = $1`,
                [id_user]
        );
    }

    // === ===  DELETE  === ===  [[END]]



}
module.exports = Timer;
