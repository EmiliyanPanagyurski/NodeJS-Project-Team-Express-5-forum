const ObjectId = require('mongodb').ObjectId;

const init = (data) => {
    const PostData = data.posts;
    return {
        newPost: (req, res) => {
            const parent = req.params.id;
            const createdBy = req.body.createdBy;
            const content = req.body.content;
            const createdOn = new Date();
            PostData.create({
                parent: parent,
                createdBy: createdBy,
                content: content,
                createdOn: createdOn,
            }).then((createdPost) => {
                return res.redirect('/threadpage/' + createdPost.parent);
            });
        },
        getPosts: (req, res) => {
            return PostData.filterBy( { parent: new ObjectId(req.params.id) })
                .then((posts) => {
                    console.log(posts);
                    return res.render('threadpage', { posts: posts });
                });
        },
    };
};

module.exports = { init };
