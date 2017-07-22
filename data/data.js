const UsersData = require('./users.data');
const ThreadsData = require('./threads.data');
const PostsData = require('./posts.data');
const MessageData = require('./message.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        threads: new ThreadsData(db),
        posts: new PostsData(db),
        messages: new MessageData(db),
    });
};

module.exports = { init };
