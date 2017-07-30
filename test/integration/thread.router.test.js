const request = require('supertest');

describe('thread router tests:', () => {
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
        it('expect 200 on /topic/:id', (done) => {
            request(app)
                .get('/topic/:id')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect 200 on /createthread/:id', (done) => {
            request(app)
                .get('/createthread/:id')
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
        const thread = {
            parent: 'test',
            name: 'test',
            createdBy: 'test',
            createdById: 'test',
            createdByImg: 'test',
            createdOn: 'test',
            content: 'test',
        };
        it('expect 200 on /createthread/:id', (done) => {
            request(app)
                .get('/createthread/:id')
                .send(thread)
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
