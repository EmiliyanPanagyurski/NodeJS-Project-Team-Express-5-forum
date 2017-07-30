/* eslint-disable max-len */
const { expect } = require('chai');
const sinon = require('sinon');
const { init } = require('../../../app/routers/thread.router/controller');

describe('Thread controller tests:', () => {
    let data = null;
    let ThreadController = null;
    let threads = null;
    let index = 0;

    let req = null;
    let res = null;

    describe('getThreads test:', () => {
        beforeEach(() => {
            threads = {
                thread: 'test',
                id: '1',
            };
            const params = {
                id: '1',
            };
            data = {
                threads: {
                    filterBy() {
                        return Promise.resolve(threads.thread);
                    },
                },
            };
            ThreadController = init(data);
            req = require('../req-res').getRequestMock({ params: params });
            res = require('../req-res').getResponseMock();
        });

        afterEach(() => {
            threads = [];
        });

        it('expect getThreads to return threads', () => {
            return ThreadController.getThreads(req, res)
                .then(() => {
                    expect(res.context).to.eql({ threads: threads.thread, id: '1' });
                    expect(res.viewName).to.eql('topicpage');
                });
        });
    });

    describe('getLatestThreads test:', () => {
        beforeEach(() => {
            data = {
                threads: {
                    filterBy() {
                        return Promise.resolve(threads);
                    },
                },
            };
            ThreadController = init(data);
            req = require('../req-res').getRequestMock();
            res = require('../req-res').getResponseMock();
        });

        afterEach(() => {
            index += 1;
            threads.push(index);
        });

        it('expect getLatestThreads to return 0 threads', () => {
            return ThreadController.getLatestThreads(req, res)
                .then(() => {
                    expect(res.context).to.eql({ threads: [] });
                    expect(res.viewName).to.eql('homepage');
                });
        });

        it('expect getLatestThreads to return 1 thread', () => {
            return ThreadController.getLatestThreads(req, res)
                .then(() => {
                    expect(res.context).to.eql({ threads: [1] });
                    expect(res.viewName).to.eql('homepage');
                });
        });

        it('expect getLatestThreads to return 2 threads', () => {
            return ThreadController.getLatestThreads(req, res)
                .then(() => {
                    expect(res.context).to.eql({ threads: [2, 1] });
                    expect(res.viewName).to.eql('homepage');
                });
        });

        it('expect getLatestThreads to return 3 threads', () => {
            return ThreadController.getLatestThreads(req, res)
                .then(() => {
                    expect(res.context).to.eql({ threads: [3, 2, 1] });
                    expect(res.viewName).to.eql('homepage');
                });
        });

        it('expect getLatestThreads to return 4 threads', () => {
            return ThreadController.getLatestThreads(req, res)
                .then(() => {
                    expect(res.context).to.eql({ threads: [4, 3, 2, 1] });
                    expect(res.viewName).to.eql('homepage');
                });
        });
    });
});
