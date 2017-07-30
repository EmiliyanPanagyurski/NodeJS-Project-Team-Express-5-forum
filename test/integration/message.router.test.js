const request = require('supertest');

describe('routers tests:', () => {
    const connectionString = 'mongodb://localhost/items-db-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('/POST tests:', () => {
        const message = {
            from: 'test',
            to: 'test',
            heading: 'test',
            content: 'test',
        };
        it.skip('expect 200 on /message', (done) => {
            request(app)
                .get('/message')
                .send(message)
                .expect(301)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
