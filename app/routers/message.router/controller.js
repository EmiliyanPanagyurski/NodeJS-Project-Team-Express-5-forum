const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const init = (data) => {
    const MessageData = data.messages;

    return {
        sendMessage: (req, res) => {
            const from = req.user[0].username;
            const to = req.body.username;
            const heading = req.body.heading;
            const content = req.body.content;
            const clean = DOMPurify.sanitize(content);

            return MessageData.create({
                from: from,
                to: to,
                heading: heading,
                content: clean,
            }).then((message) => {
                return res.redirect(301, '/');
            });
        },
        getMessages: (req, res) => {
            return MessageData.filterBy({ to: req.user[0].username })
                .then((messages) => {
                    return res.render('inbox', { messages: messages });
                });
        },
    };
};

module.exports = { init };
