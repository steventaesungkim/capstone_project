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


    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Timers table
    // Returns an array of Timer class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM timers`
            )
            .then(timerArray => {
                const instanceArray = timerArray.map(timerObj => {
                    return new Timer(timerObj.id, timerObj.time, timerObj.level, timerObj.id_category, timerObj.id_user);
                });
                return instanceArray;
            });
    }

    // Gets individual record from Timers table for a specific ID
    // Returns a Timer class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM timers WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Timer(result.id, result.time, result.level, result.id_category, result.id_user);
            });
        }

    // Gets all records from Timers table for a specific User ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Timer IDs if returnAllData is false
    //   - Returns an array of Timer class instances if returnAllData is true or omitted
    static getByUserId(userID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM timers WHERE id_user = $1`,
                    [userID]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Timer(t.id, t.time, t.level, t.id_category, t.id_user);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM timers WHERE id_user = $1`,
                    [userID]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // Gets all records from Timers table for a specific User ID and level
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Timer IDs if returnAllData is false
    //   - Returns an array of Timer class instances if returnAllData is true or omitted
    static getByUserLevel(userID, level, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM timers WHERE (id_user = $1 AND level = $2)`,
                    [userID, level]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Timer(t.id, t.time, t.level, t.id_category, t.id_user);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM timers WHERE (id_user = $1 AND level = $2)`,
                    [userID, level]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // Gets all records from Timers table for a specific Category ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Timer IDs if returnAllData is false
    //   - Returns an array of Timer class instances if returnAllData is true or omitted
    static getByCategoryId(catID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM timers WHERE id_category = $1`,
                    [catID]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Timer(t.id, t.time, t.level, t.id_category, t.id_user);
                    });
                    return instanceArray;
                });
        
        } else {
            return db.any(`
                    SELECT id FROM timers WHERE id_category = $1`,
                    [catID]
                )
                .then(result => {
                    return result.map(r => r.id);
                });
        }
    }

    // Gets all records from Timers table for a specific Category ID and level
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Timer IDs if returnAllData is false
    //   - Returns an array of Timer class instances if returnAllData is true or omitted
    static getByCategoryLevel(catID, level, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM timers WHERE (id_category = $1 AND level = $2)`,
                    [catID, level]
                )
                .then(tArray => {
                    const instanceArray = tArray.map(t => {
                        return new Timer(t.id, t.time, t.level, t.id_category, t.id_user);
                    });
                    return instanceArray;
                });
        
        } else {
            return db.any(`
                    SELECT id FROM timers WHERE (id_category = $1 AND level = $2)`,
                    [catID, level]
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
                UPDATE timers SET time=$2, level=$3, id_category=$4, id_user=$5
                WHERE id=$1`,
                [this.id, this.time, this.level, this.id_category, this.id_user]
            )
            .then(result => {
                return result.rowCount === 1;
            });
    }

    // Updates the value of field fieldName to newValue for THIS timer
    // Returns boolean True if successful, False if unsuccessful
    updateField(fieldName, newValue) {
        return db.result(`
                UPDATE timers SET ${fieldName}=$2 WHERE id=$1`,
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
                DELETE FROM timers WHERE id = $1`,
               [this.id]
        );
    }

    // Delete a specific timer by ID
    static deleteById(id) {
        return db.result(`
                DELETE FROM timers WHERE id = $1`,
                [id]
        );
    }

    // Delete all the timers owned by a specific User ID
    static deleteByUserId(id_user) {
        return db.result(`
                DELETE FROM timers WHERE id_user = $1`,
                [id_user]
        );
    }

    // Delete all the timers belonging to a specific Category ID
    static deleteByCategoryId(id_category) {
        return db.result(`
                DELETE FROM timers WHERE id_category = $1`,
                [id_category]
        );
    }

    // === ===  DELETE  === ===  [[END]]


}
module.exports = Timer;
