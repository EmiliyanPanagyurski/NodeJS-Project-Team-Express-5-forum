const init = (data) => {
    const ThreadsData = data.threads;
    const PostsData = data.posts;

    return {
        newThread: (req, res) => {
            const parent = req.params.id;
            const name = req.body.name;
            const createdBy = req.user[0].username;
            const createdById = req.user[0]._id;
            const content = req.body.content;
            const createdOn = new Date();
            ThreadsData.create({
                parent: parent,
                name: name,
                createdBy: createdBy,
                createdById: createdById,
                createdOn: createdOn,
                content: content,
            }).then((createdThread) => {
                PostsData.create({
                    parent: createdThread._id,
                    createdBy: createdThread.createdBy,
                    createdById: createdThread.createdById,
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
        getLatestThreads: (req, res) => {
            return ThreadsData.filterBy()
                .then((threads) => {
                    const count = threads.length - 1;
                    return res.render('homepage',
                        {
                            threads:
                                [threads[count],
                                threads[count - 1],
                                threads[count - 2],
                                threads[count - 3]],
                        });
                });
        },
    };
};

module.exports = { init };
