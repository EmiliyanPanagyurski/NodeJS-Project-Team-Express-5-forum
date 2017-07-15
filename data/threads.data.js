const BaseData = require('./base/base.data');
const Thread = require('../models/thread.model');

class ThreadData extends BaseData {
    constructor(db) {
        super(db, Thread);
    }
}

module.exports = ThreadData;
