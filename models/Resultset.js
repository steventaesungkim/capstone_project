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


    // Get all resultset history for a specific User ID
    // Returns an array of resultsets with date, category type, level and score
    static getResultHistory(userID) {
        return db.any(`
                SELECT DISTINCT rs.time, c.category_type, q.level, rs.score
                FROM resultsets rs
                INNER JOIN results r ON rs.id = r.id_resultset
                INNER JOIN questions q ON r.id_question = q.id
                INNER JOIN categories c ON q.id_category = c.id    
                WHERE rs.id_user = $1`,
                [userID]
            )
            // .then(rsArray => {
            //     const instanceArray = rsArray.map(rs => {
            //         return new Resultset(rs.id, rs.time, rs.id_user, rs.score);
            //     });
            //     return instanceArray;
            // });
    }

    // === ===  RETRIEVE  === ===  [[END]]


    // === ===  UPDATE  === ===  [[START]]

    // Updates all fields for THIS resultset
    // Returns boolean True if successful, False if unsuccessful
    update() {
        return db.result(`
                UPDATE resultsets SET time=$2, id_user=$3, score=$4 WHERE id=$1`,
                [this.id, this.time, this.id_user, this.score]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the value of field fieldName to newValue for THIS resultset
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
    
    // Delete THIS resultset
    delete() {
        return db.result(`
                DELETE FROM resultsets WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific resultset by ID
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

    // === ===  DELETE  === ===  [[END]]

}
module.exports = Resultset;
