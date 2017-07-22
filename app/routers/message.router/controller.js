const init = (data) => {
    const MessageData = data.messages;

    return {
        sendMessage: (req, res) => {
            const from = req.user[0].username;
            const to = req.body.username;
            const heading = req.body.heading;
            const content = req.body.content;

            MessageData.create({
                from: from,
                to: to,
                heading: heading,
                content: content,
            }).then((message) => {
                return res.redirect('/');
            });
        },
        getMessages: (req, res) => {
            MessageData.filterBy({ to: req.user[0].username })
                .then((messages) => {
                    console.log(messages);
                    return res.render('inbox', { messages: messages });
                });
        },
    };
};

module.exports = { init };
