const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    checkIfUsernameAndEmailAreFree(username, email) {
        return this.filterBy()
            .then((users) => {
                for (let index = 0; index < users.length; index++) {
                    if (users[index].username === username) {
                        return {
                            valid: false,
                            msg: 'username is already taken',
                        };
                    }

                    if (users[index].email === email) {
                        return {
                            valid: false,
                            msg: 'email is already in use',
                        };
                    }
                }
                return {
                    valid: true,
                    msg: 'no errors',
                };
            });
    }

    comparePasswords(candidatePassword, realPassword, callback) {
        if (candidatePassword !== realPassword) {
            return callback(false);
        }

        return callback(true);
    }
}

module.exports = UsersData;
