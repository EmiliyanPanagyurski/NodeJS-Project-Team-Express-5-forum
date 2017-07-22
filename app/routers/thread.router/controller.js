const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const init = (data) => {
    const ThreadsData = data.threads;
    const PostsData = data.posts;

    return {
        newThread: (req, res) => {
            const parent = req.params.id;
            const name = req.body.name;
            const createdBy = req.user[0].username;
            const createdById = req.user[0]._id;
            const createdByImg = req.user[0].img;
            const content = req.body.content;
            const createdOn = new Date();
            ThreadsData.create({
                parent: parent,
                name: name,
                createdBy: createdBy,
                createdById: createdById,
                createdByImg: createdByImg,
                createdOn: createdOn,
                content: content,
            }).then((createdThread) => {
                const clean = DOMPurify.sanitize(createdThread.content);
                PostsData.create({
                    parent: createdThread._id,
                    createdBy: createdThread.createdBy,
                    createdById: createdThread.createdById,
                    createdByImg: createdThread.createdByImg,
                    content: clean,
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
                    const count = threads.length;

                    if (count === 0) {
                        return res.render('homepage', { threads: [] });
                    }

                    if (count === 1) {
                        return res.render('homepage',
                            {
                                threads: [threads[count - 1]],
                            });
                    }

                    if (count === 2) {
                         return res.render('homepage',
                            {
                                threads:
                                    [threads[count - 1],
                                    threads[count - 2]],
                            });
                    }

                    if (count === 3) {
                        return res.render('homepage',
                            {
                                threads:
                                    [threads[count - 1],
                                    threads[count - 2],
                                    threads[count - 3]],
                            });
                    }

                    return res.render('homepage',
                        {
                            threads:
                                [threads[count - 1],
                                threads[count - 2],
                                threads[count - 3],
                                threads[count - 4]],
                        });
                });
        },
    };
};

module.exports = { init };
