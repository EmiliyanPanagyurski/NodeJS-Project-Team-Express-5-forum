const ThreadModel = require('../../../models/thread.model');

const init = (data) => {
    const ThreadsData = data.threads;

    return {
        newThread: (req, res) => {
            const parent = req.body.parent;
            const name = req.body.name;
            const createdBy = req.body.createdBy;
            const content = req.body.content;
            const createdOn = new Date();
            ThreadsData.create({
                parent: parent,
                name: name,
                createdBy: createdBy,
                content: content,
                createdOn: createdOn,
            }).then((createdThread) => {
                return res.render('threadpage',
                    { createdThread: createdThread });
            });
        },
        getThreads: (req, res) => {
            return ThreadsData.filterBy( { parent: req.params.id })
                .then((threads) => {
                    return res.render('topicpage', { threads: threads });
                });
        },
    };
};

module.exports = { init };
