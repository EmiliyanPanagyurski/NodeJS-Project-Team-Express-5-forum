const init = (data) => {
    const PostData = data.posts;
    return {
        newPost: (req, res) => {
            const parent = req.body.parent;
            const createdBy = req.body.createdBy;
            const content = req.body.content;
            const createdOn = new Date();
            PostData.create({
                parent: parent,
                createdBy: createdBy,
                content: content,
                createdOn: createdOn,
            }).then((createdPost) => {
                return res.render('threadpage',
                    { createdPost: createdPost });
            });
        },
        getPosts: (req, res) => {
            return PostData.filterBy( { parent: req.params.id })
                .then((posts) => {
                    return res.render('threadpage', { posts: posts });
                });
        },
    };
};

module.exports = { init };
