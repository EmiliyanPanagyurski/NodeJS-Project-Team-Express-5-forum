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

    describe('/GET tests:', () => {
        it('expect 200 on /createpost/:id', (done) => {
            request(app)
                .get('/createpost/:id')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('/POST tests:', () => {
        const post = {
            parent: 'test',
            createdBy: 'test',
            createdById: 'test',
            createdByImg: 'test',
            content: 'test',
            createdOn: 'test',
        };
        it('expect 200 on /createpost/:id', (done) => {
            request(app)
                .get('/createpost/:id')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
