const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const init = (data, ObjectId) => {
    const PostData = data.posts;
    return {
        newPost: (req, res) => {
            const parent = new ObjectId(req.params.id);
            const createdBy = req.user[0].username;
            const content = req.body.content;
            const createdOn = new Date();
            const createdById = req.user[0]._id;
            const clean = DOMPurify.sanitize(content);
            PostData.create({
                parent: parent,
                createdBy: createdBy,
                createdById: createdById,
                createdByImg: req.user[0].img,
                content: clean,
                createdOn: createdOn,
            }).then((createdPost) => {
                return res.redirect(301, '/threadpage/' + createdPost.parent);
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
