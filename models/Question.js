const db = require('./db');

class Question {
    constructor(id, level, question, answer, id_category) {
        this.id = id;
        this.level = level;
        this.question = question;
        this.answer = answer;
        this.id_category = id_category;
    }

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Questions table
    // Returns a new instance of the Question class
    static createQuestion(level, question, answer, id_category) {
        return db.one(`
                INSERT INTO questions 
                    (level, question, answer, id_category)
                VALUES 
                    ($1, $2, $3, $4)
                RETURNING id`,
                [level, question, answer, id_category]
            )
            .then(data => {
                return new Question (data.id, level, question, answer, id_category);
            });
    }
    // === ===  CREATE  === ===  [[END]]

// STILL NEED TO TEST THE CREATE FUNCTION


//  ++++++++++++++++++++++++++++++++++++++++++++++
// UPDATES HAVE NOT BEEN MADE BELOW THIS LINE




    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Questions table
    // Returns an array of Question class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM questions`
            )
            .then(catArray => {
                const instanceArray = catArray.map(catObj => {
                    return new Question(catObj.id, catObj.question, catObj.levels, catObj.id_user);
                });
                return instanceArray;
            });
    }

    // Get individual record from Questions table for a specific ID
    // Returns a Question class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM questions WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Question(result.id, result.question, result.levels, result.id_user);
            });
        }

    // Gets all records from Questions table for a specific User ID
    // Returns an array of Question IDs for all questions the user owns
    static getByUserID(userID) {
        return db.any(`
                SELECT id FROM questions WHERE id_user = $1`,
                [userID]
            )
            .then(result => {
                return result.map(r => r.id);
            });
    }

    // === ===  RETRIEVE  === ===  [[END]]


    // === ===  UPDATE  === ===  [[START]]

    // Updates the question for THIS question
    // Returns boolean True if successful, False if unsuccessful
    updateQuestionType(newType) {
        return db.result(`
                UPDATE questions SET question=$2 WHERE id=$1`,
                [this.id, newType]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the levels for THIS question
    // Returns boolean True if successful, False if unsuccessful
    updateLevels(newLevels) {       // newLevels should be boolean (true or false)
        return db.result(`
                UPDATE questions SET levels=$2 WHERE id=$1`,
                [this.id, newLevels]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Could add an updateUserId for admin purposes, but not needed now

    // === ===  UPDATE  === ===  [[END]]

    
    // === ===  DELETE  === ===  [[START]]
    
    // Delete THIS question
    delete() {
        return db.result(`
                DELETE FROM questions WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific question by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM questions WHERE id = $1`,
                [id]
        );
    }

    // Delete all the questions owned by a specific User ID
    static deleteByUserId(id_user) {
        return db.result(`
                DELETE FROM questions WHERE id_user = $1`,
                [id_user]
        );
    }

    // === ===  DELETE  === ===  [[END]]



}
module.exports = Question;
