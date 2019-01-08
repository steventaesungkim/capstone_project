const db = require('./db');

class Result {
    constructor(id, time, correct, id_user, id_question) {
        this.id = id;
        this.time = time;
        this.correct = correct;
        this.id_user = id_user;
        this.id_question = id_question;
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //                                                                   +
    //                 CODE NOT COMPLETE BELOW HERE                      +
    //                                                                   +
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Results table
    // Returns a new instance of the Result class
    static createTimer(time, correct, id_question, id_user) {
        return db.one(`
                INSERT INTO results 
                    (time, correct, id_question, id_user)
                VALUES 
                    ($1, $2, $3, $4)
                RETURNING id`,
                [time, correct, id_question, id_user]
            )
            .then(data => {
                return new Result (data.id, time, correct, id_question, id_user);
            });
    }
    // === ===  CREATE  === ===  [[END]]


    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Results table
    // Returns an array of Result class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM results`
            )
            .then(timerArray => {
                const instanceArray = timerArray.map(timerObj => {
                    return new Result(timerObj.id, timerObj.time, timerObj.correct, timerObj.id_question, timerObj.id_user);
                });
                return instanceArray;
            });
    }

    // Gets individual record from Results table for a specific ID
    // Returns a Result class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM results WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Result(result.id, result.time, result.correct, result.id_question, result.id_user);
            });
        }

    // Gets all records from Results table for a specific User ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Result IDs if returnAllData is false
    //   - Returns an array of Result class instances if returnAllData is true or omitted
    static getByUserId(userID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM results WHERE id_user = $1`,
                    [userID]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Result(t.id, t.time, t.correct, t.id_question, t.id_user);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM results WHERE id_user = $1`,
                    [userID]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // Gets all records from Results table for a specific User ID and correct
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Result IDs if returnAllData is false
    //   - Returns an array of Result class instances if returnAllData is true or omitted
    static getByUserLevel(userID, correct, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM results WHERE (id_user = $1 AND correct = $2)`,
                    [userID, correct]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Result(t.id, t.time, t.correct, t.id_question, t.id_user);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM results WHERE (id_user = $1 AND correct = $2)`,
                    [userID, correct]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // Gets all records from Results table for a specific question ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Result IDs if returnAllData is false
    //   - Returns an array of Result class instances if returnAllData is true or omitted
    static getByCategoryId(catID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM results WHERE id_question = $1`,
                    [catID]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Result(t.id, t.time, t.correct, t.id_question, t.id_user);
                    });
                    return instanceArray;
                });
        
        } else {
            return db.any(`
                    SELECT id FROM results WHERE id_question = $1`,
                    [catID]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // Gets all records from Results table for a specific question ID and correct
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Result IDs if returnAllData is false
    //   - Returns an array of Result class instances if returnAllData is true or omitted
    static getByCategoryLevel(catID, correct, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM results WHERE (id_question = $1 AND correct = $2)`,
                    [catID, correct]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Result(t.id, t.time, t.correct, t.id_question, t.id_user);
                    });
                    return instanceArray;
                });
        
        } else {
            return db.any(`
                    SELECT id FROM results WHERE (id_question = $1 AND correct = $2)`,
                    [catID, correct]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // === ===  RETRIEVE  === ===  [[END]]


    // === ===  UPDATE  === ===  [[START]]

    // Updates all fields for THIS timer
    // Returns boolean True if successful, False if unsuccessful
    update() {
        return db.result(`
                UPDATE results SET time=$2, correct=$3, id_question=$4, id_user=$5
                WHERE id=$1`,
                [this.id, this.time, this.correct, this.id_question, this.id_user]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the value of field fieldName to newValue for THIS timer
    // Returns boolean True if successful, False if unsuccessful
    updateField(fieldName, newValue) {
        return db.result(`
                UPDATE results SET ${fieldName}=$2 WHERE id=$1`,
                [this.id, newValue]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // === ===  UPDATE  === ===  [[END]]


    // === ===  DELETE  === ===  [[START]]
    
    // Delete THIS timer
    delete() {
        return db.result(`
                DELETE FROM results WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific timer by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM results WHERE id = $1`,
                [id]
        );
    }

    // Delete all the results owned by a specific User ID
    static deleteByUserId(id_user) {
        return db.result(`
                DELETE FROM results WHERE id_user = $1`,
                [id_user]
        );
    }

    // Delete all the results belonging to a specific question ID
    static deleteByCategoryId(id_question) {
        return db.result(`
                DELETE FROM results WHERE id_question = $1`,
                [id_question]
        );
    }

// MAY NEED MORE DELETE OPTIONS TO DELETE BY COMBO OF USER+correct, CAT+correct, 
// USER+CAT, OR USER+CAT+correct, OR MAYBE SET IT UP SO THOSE DELETE AUTOMATICALLY
// UPON DELETIONS FROM OTHER TABLES

    // === ===  DELETE  === ===  [[END]]



}
module.exports = Result;

// Need instance functions for allowing a User instance to request list of its results and its categories