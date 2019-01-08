const db = require('./db');

class Resultset {
    constructor(id, time, id_user, score) {
        this.id = id;
        this.time = time;
        this.id_user = id_user;
        this.score = score;
    }

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Resultsets table
    // Returns a new instance of the Resultset class
    static createResultset(time, id_user, score) {
        return db.one(`
                INSERT INTO resultsets 
                    (time, id_user, score)
                VALUES 
                    ($1, $2, $3)
                RETURNING id`,
                [time, id_user, score]
            )
            .then(data => {
                return new Resultset (data.id, time, id_user, score);
            });
    }
    // === ===  CREATE  === ===  [[END]]


    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Resultsets table
    // Returns an array of Resultset class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM resultsets`
            )
            .then(resultsetArray => {
                const instanceArray = resultsetArray.map(rsObj => {
                    return new Resultset(rsObj.id, rsObj.time, rsObj.id_user, rsObj.score);
                });
                return instanceArray;
            });
    }

    // Gets individual record from Resultsets table for a specific resultset ID
    // Returns a Resultset class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM resultsets WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Resultset(result.id, result.time, result.id_user, result.score);
            });
        }

    // Gets all records from Resultsets table for a specific User ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Resultset IDs if returnAllData is false
    //   - Returns an array of Resultset class instances if returnAllData is true or omitted
    static getByUserId(userID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM resultsets WHERE id_user = $1`,
                    [userID]
                )
                .then(rsArray => {
                    const instanceArray = rsArray.map(rs => {
                        return new Resultset(rs.id, rs.time, rs.id_user, rs.score);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM resultsets WHERE id_user = $1`,
                    [userID]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // === ===  RETRIEVE  === ===  [[END]]




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                                                   +
//                 CODE NOT COMPLETE BELOW HERE                      +
//                                                                   +
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    

    // === ===  UPDATE  === ===  [[START]]

    // Updates all fields for THIS timer
    // Returns boolean True if successful, False if unsuccessful
    update() {
        return db.result(`
                UPDATE resultsets SET time=$2, score=$3, id_question=$4, id_user=$5
                WHERE id=$1`,
                [this.id, this.time, this.score, this.id_question, this.id_user]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the value of field fieldName to newValue for THIS timer
    // Returns boolean True if successful, False if unsuccessful
    updateField(fieldName, newValue) {
        return db.result(`
                UPDATE resultsets SET ${fieldName}=$2 WHERE id=$1`,
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
                DELETE FROM resultsets WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific timer by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM resultsets WHERE id = $1`,
                [id]
        );
    }

    // Delete all the resultsets owned by a specific User ID
    static deleteByUserId(id_user) {
        return db.result(`
                DELETE FROM resultsets WHERE id_user = $1`,
                [id_user]
        );
    }

    // Delete all the resultsets belonging to a specific question ID
    static deleteByCategoryId(id_question) {
        return db.result(`
                DELETE FROM resultsets WHERE id_question = $1`,
                [id_question]
        );
    }

// MAY NEED MORE DELETE OPTIONS TO DELETE BY COMBO OF USER+score, CAT+score, 
// USER+CAT, OR USER+CAT+score, OR MAYBE SET IT UP SO THOSE DELETE AUTOMATICALLY
// UPON DELETIONS FROM OTHER TABLES

    // === ===  DELETE  === ===  [[END]]



}
module.exports = Resultset;

// Need instance functions for allowing a User instance to request list of its resultsets and its categories