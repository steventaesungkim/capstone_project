const db = require('./db');

class Result {
    constructor(id, id_resultset, id_question, correct) {
        this.id = id;
        this.id_resultset = id_resultset;
        this.id_question = id_question;
        this.correct = correct;
    }

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Results table
    // Returns a new instance of the Result class
    static createResult(id_resultset, id_question, correct) {
        return db.one(`
                INSERT INTO results 
                    (id_resultset, id_question, correct)
                VALUES 
                    ($1, $2, $3)
                RETURNING id`,
                [id_resultset, id_question, correct]
            )
            .then(data => {
                return new Result (data.id, id_resultset, id_question, correct);
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
            .then(resultArray => {
                const instanceArray = resultArray.map(resultObj => {
                    return new Result(resultObj.id, resultObj.id_resultset, resultObj.id_question, resultObj.correct);
                });
                return instanceArray;
            });
    }

    // Gets individual record from Results table for a specific result ID
    // Returns a Result class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM results WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Result(result.id, result.id_resultset, result.id_question, result.correct);
            });
        }

    // Gets all records from Results table for a specific resultset ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Result IDs if returnAllData is false
    //   - Returns an array of Result class instances if returnAllData is true or omitted
    static getByResultSet(resultsetID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM results WHERE id_resultset = $1`,
                    [resultsetID]
                )
                .then(resultArray => {
                    const instanceArray = resultArray.map(r => {
                        return new Result(r.id, r.id_resultset, r.id_question, r.correct);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM results WHERE id_resultset = $1`,
                    [resultsetID]
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
    static getByQuestion(qID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM results WHERE id_question = $1`,
                    [qID]
                )
                .then(resultArray => {
                    const instanceArray = resultArray.map(r => {
                        return new Result(r.id, r.id_resultset, r.id_question, r.correct);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM results WHERE id_question = $1`,
                    [qID]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // === ===  RETRIEVE  === ===  [[END]]


    // === ===  UPDATE  === ===  [[START]]

    // Updates all fields for THIS result
    // Returns boolean True if successful, False if unsuccessful
    update() {
        return db.result(`
                UPDATE results SET id_resultset=$2, id_question=$3, correct=$4 WHERE id=$1`,
                [this.id, this.id_resultset, this.id_question, this.correct]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the value of field fieldName to newValue for THIS result
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





//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                                                   +
//                 CODE NOT COMPLETE BELOW HERE                      +
//                                                                   +
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    


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
    static deleteByUserId(id_resultset) {
        return db.result(`
                DELETE FROM results WHERE id_resultset = $1`,
                [id_resultset]
        );
    }

    // Delete all the results belonging to a specific question ID
    static deleteByCategoryId(id_question) {
        return db.result(`
                DELETE FROM results WHERE id_question = $1`,
                [id_question]
        );
    }


    // === ===  DELETE  === ===  [[END]]



}
module.exports = Result;
