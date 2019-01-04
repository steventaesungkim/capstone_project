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


    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Questions table
    // Returns an array of Question class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM questions`
            )
            .then(qArray => {
                const instanceArray = qArray.map(q => {
                    return new Question(q.id, q.level, q.question, q.answer, q.id_category);
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
            .then(q => {
                return new Question(q.id, q.level, q.question, q.answer, q.id_category);
            });
        }

    // Gets all records from Questions table for a specific Category ID
    // Returns an array of Question IDs for all questions in the Category
    static getByCategory(catID) {
        return db.any(`
                SELECT id FROM questions WHERE id_category = $1`,
                [catID]
            )
            .then(result => {
                return result.map(r => r.id);
            });
    }

    // Gets all records from Questions table for a specific Category ID and Level
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Question IDs if returnAllData is false or omitted
    //   - Returns an array of Question class instances if returnAllData is true
    static getByLevel(catID, level, returnAllData=false) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM questions WHERE (id_category = $1 AND level = $2)`,
                    [catID, level]
                )
                .then(qArray => {
                    const instanceArray = qArray.map(q => {
                        return new Question(q.id, q.level, q.question, q.answer, q.id_category);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT * FROM questions WHERE (id_category = $1 AND level = $2)`,
                    [catID, level]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // === ===  RETRIEVE  === ===  [[END]]




//  ++++++++++++++++++++++++++++++++++++++++++++++
// UPDATES HAVE NOT BEEN MADE BELOW THIS LINE



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
