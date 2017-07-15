class Thread {
    constructor(name, postedBy, parentTopic, date, content) {
        this.name = name;
        this.postedBy = postedBy;
        this.parentTopic = parentTopic;
        this.date = date;
        this.content = content;
    }
}

module.exports = Thread;
