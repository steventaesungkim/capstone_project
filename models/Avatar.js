const db = require('./db');

class Avatar {
    constructor(id, id_user, name, img) {
        this.id = id;
        this.id_user = id_user;
        this.name = name;
        this.img = img;
    }

    // === ===  CREATE  === ===  [[START]]

    // Inserts a new record in the Avatar table
    // Returns a new instance of the Avatar class
    static createAvatar(id_user, name, img) {
        return db.one(`
                INSERT INTO avatar 
                    (id_user, name, img)
                VALUES 
                    ($1, $2, $3)
                RETURNING id`,
                [id_user, name, img]
            )
            .then(data => {
                return new Avatar(data.id, id_user, name, img);
            });
    }
    // === ===  CREATE  === ===  [[END]]


    // === ===  RETRIEVE  === ===  [[START]]
    
    // Gets all records from Avatars table
    // Returns an array of Avatar class instances 
    static getAll() {
        return db.any(`
                SELECT * FROM avatars`
            )
            .then(avatarArray => {
                const instanceArray = avatarArray.map(avatarObj => {
                    return new Avatar(avatarObj.id, avatarObj.id_user, avatarObj.name, avatarObj.img);
                });
                return instanceArray;
            });
    }

    // Get individual record from Avatar table for a specific ID
    // Returns a Avatar class instance
    static getById(id) {
        return db.one(`
                SELECT * FROM avatar WHERE id = $1`,
                [id]
            )
            .then(result => {
                return new Avatar(result.id, result.id_user, result.name, result.img);
            });
        }

    // Gets all records from Avatar table for a specific User ID
    // The returnAllData flag determines what is returned:
    //   - Returns an array of Avatar IDs if returnAllData is false
    //   - Returns an array of Avatar class instances if returnAllData is true or omitted
    static getByUserId(userID, returnAllData=true) {
        if (returnAllData) {
            return db.any(`
                    SELECT * FROM avatar WHERE id_user = $1`,
                    [userID]
                )
                .then(avatarArray => {
                    const instanceArray = avatarArray.map(avatar => {
                        return new Avatar(avatar.id, avatar.id_user, avatar.name, avatar.img);
                    });
                    return instanceArray;
                });
        } else {
            return db.any(`
                    SELECT id FROM avatar WHERE id_user = $1`,
                    [userID]
                )
                .then(result => {
                    return result.map(theResult => 
                        theResult.id
                    );
                });
        }
    }

    // === ===  RETRIEVE  === ===  [[END]]
    

    // === ===  UPDATE  === ===  [[START]]

    // Updates Avatar THIS User
    // Returns boolean True if successful, False if unsuccessful
    updateImg() {
        return db.result(`
                UPDATE avatars SET id_user = $1 
	            WHERE id = $2`,
                [this.id_user, this.id]
            )

            .then(result => {
                return result.rowCount === 1;
            });
    }

    // === ===  UPDATE  === ===  [[END]]


    // === ===  DELETE  === ===  [[START]]

    // Delete Avater by a specific User ID
    static deleteByUserId(id_user) {
        return db.result(`
            DELETE FROM avatars WHERE id_user = $1`,
                [id_user]
        );
    }

    // === ===  DELETE  === ===  [[END]]

}

module.exports = Avatar;