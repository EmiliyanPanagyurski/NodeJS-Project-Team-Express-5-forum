/* eslint-disable max-len */
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../app/routers/user.router/controller');
const ObjectId = require('mongodb').ObjectId;

describe('User controller tests:', () => {
    let data = null;
    let UserController = null;

    let req = null;
    let res = null;

    const stub = sinon.stub(ObjectId, 'new ObjectId');

    describe('updateProfile test:', () => {
        beforeEach(() => {
            const body = {
                username: 'test',
                firstname: 'test',
                lastname: 'test',
                signature: 'test',
            };
            const user = {
                _id: '1',
            };
            data = {
                users: {
                    update(a, b) {
                        return Promise.resolve();
                    },
                },
            };

            UserController = init(data);
            req = require('../req-res')
                .getRequestMock({ body: body, user: user });
            res = require('../req-res').getResponseMock();
        });

        it('expect updateProfile to redirect to profile', () => {
            return UserController.updateProfile(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.eql('/profile/1');
                    expect(res.status).to.eql(301);
                });
        });
    });

    describe('updateProfileImage test:', () => {
        beforeEach(() => {
            const user = {
                username: 'test',
                _id: '1',
            };
            const file = {
                originalname: 'test',
            };
            data = {
                users: {
                    update(a, b) {
                        return Promise.resolve();
                    },
                },
                posts: {
                    updateMany(a, b) {
                        return Promise.resolve();
                    },
                },
            };

            UserController = init(data);
            req = require('../req-res')
                .getRequestMock({ user: [user], file: file });
            res = require('../req-res').getResponseMock();
        });

        it('expect updateProfileImage to redirect to profile', () => {
            return UserController.updateProfileImage(req, res)
                .then(() => {
                    expect(res.redirectUrl).to.eql('/profile/1');
                    expect(res.status).to.eql(301);
                });
        });
    });

    describe('getPublicProfile test:', () => {
        beforeEach(() => {
            const isAuthenticated = () => {
                return false;
            };
            const users = [{
                username: 'test',
                firstName: 'test',
                lastName: 'test',
                email: 'test',
                signature: 'test',
                img: 'test',
                _id: '1',
            }];
            const params = {
                id: '1',
            };
            data = {
                users: {
                    filterBy(a) {
                        return Promise.resolve(users);
                    },
                },
            };
            UserController = init(data, stub);
            req = require('../req-res')
                .getRequestMock({ isAuthenticated: isAuthenticated, users: users, params: params });
            res = require('../req-res').getResponseMock();
        });

        afterEach(() => {
            stub.restore();
        });

        it('expect getPublicProfile to return users when isAuthenticated is false', () => {
            return UserController.getPublicProfile(req, res)
                .then(() => {
                    expect(res.context).to.eql(req.users[0]);
                    expect(res.viewName).to.eql('publicprofile');
                });
        });
    });
});
