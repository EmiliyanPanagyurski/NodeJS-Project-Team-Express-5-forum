const BaseData = require('./base/base.data');
const message = require('../models/message.model');

class MessageData extends BaseData {
    constructor(db) {
        super(db, message);
    }
}

module.exports = MessageData;
