class Post {
    constructor(postedBy, parentThread, date, content) {
        this.postedBy = postedBy;
        this.parentThread = parentThread;
        this.date = date;
        this.content = content;
    }
}

module.exports = Post;
