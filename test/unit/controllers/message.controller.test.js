/* eslint-disable max-len */
const { expect } = require('chai');
const { init } = require('../../../app/routers/message.router/controller');

describe('Message controller tests:', () => {
    const messages = {
        messages: 'test',
    };
    const data = {
        messages: {
            filterBy(a) {
                return Promise.resolve(messages);
            },
        },
    };

    const user = {
        username: 'test',
    };

    const MessageController = init(data);
    const req = require('../req-res').getRequestMock({ user: [user] });
    const res = require('../req-res').getResponseMock();

    it('expect getMessages to return  messages', () => {
        return MessageController.getMessages(req, res)
            .then(() => {
                expect(res.context).to.eql({ messages: messages });
                expect(res.viewName).to.eql('inbox');
            });
    });
});
