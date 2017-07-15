const UsersData = require('./users.data');
const ThreadsData = require('./threads.data');
const PostsData = require('./posts.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        threads: new ThreadsData(db),
        posts: new PostsData(db),
    });
};

module.exports = { init };
