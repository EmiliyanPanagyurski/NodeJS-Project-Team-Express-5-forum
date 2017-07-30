/* eslint-disable max-len */
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../app/routers/post.router/controller');
const ObjectId = require('mongodb').ObjectId;

describe('Post controller tests:', () => {
    const stub = sinon.stub(ObjectId, 'new ObjectId');
    const params = {
        id: '1',
    };

    const posts = {
        post: 'test',
    };

    const data = {
        posts: {
            filterBy(a) {
                return Promise.resolve(posts);
            },
        },
    };

    const PostController = init(data, stub);
    const req = require('../req-res').getRequestMock({ params: params });
    const res = require('../req-res').getResponseMock();

    afterEach(() => {
        stub.restore();
    });

    it('expect getPosts to return  posts', () => {
        return PostController.getPosts(req, res)
            .then(() => {
                expect(res.context).to.eql({ posts: posts });
                expect(res.viewName).to.eql('threadpage');
            });
    });
});
