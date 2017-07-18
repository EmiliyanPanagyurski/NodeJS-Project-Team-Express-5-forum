const init = (data) => {
    const ThreadsData = data.threads;
    const PostsData = data.posts;

    return {
        newThread: (req, res) => {
            const parent = req.params.id;
            const name = req.body.name;
            const createdBy = req.user[0].username;
            const content = req.body.content;
            const createdOn = new Date();
            ThreadsData.create({
                parent: parent,
                name: name,
                createdBy: createdBy,
                createdOn: createdOn,
                content: content,
            }).then((createdThread) => {
                PostsData.create({
                    parent: createdThread._id,
                    createdBy: createdThread.createdBy,
                    content: createdThread.content,
                    createdOn: createdThread.createdOn,
                }).then((createdpost) => {
                    return res.redirect('/threadpage/' + createdpost.parent);
                });
            });
        },
        getThreads: (req, res) => {
            return ThreadsData.filterBy( { parent: req.params.id })
                .then((threads) => {
                    return res.render('topicpage',
                        { id: req.params.id, threads: threads });
                });
        },
    };
};

module.exports = { init };
