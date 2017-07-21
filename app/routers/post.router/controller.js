const ObjectId = require('mongodb').ObjectId;

const init = (data) => {
    const PostData = data.posts;
    return {
        newPost: (req, res) => {
            const parent = new ObjectId(req.params.id);
            const createdBy = req.user[0].username;
            const content = req.body.content;
            const createdOn = new Date();
            const createdById = req.user[0]._id;
            PostData.create({
                parent: parent,
                createdBy: createdBy,
                createdById: createdById,
                createdByImg: req.user[0].img,
                content: content,
                createdOn: createdOn,
            }).then((createdPost) => {
                return res.redirect('/threadpage/' + createdPost.parent);
            });
        },
        getPosts: (req, res) => {
            return PostData.filterBy( { parent: new ObjectId(req.params.id) })
                .then((posts) => {
                    return res.render('threadpage', { posts: posts });
                });
        },
    };
};

module.exports = { init };
