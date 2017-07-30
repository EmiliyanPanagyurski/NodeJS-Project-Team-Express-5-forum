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
        it('expect to get 200 from /profile/:id', (done) => {
            request(app)
                .get('/profile/:id')
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
        const user = {
            username: 'test',
            password: 'test',
            email: 'test',
            firstName: 'test',
            lastName: 'test',
            signature: 'test',
            img: 'test',

        };
        const profile = {
                username: 'test',
                email: 'test',
                firstName: 'test',
                lastName: 'test',
                signature: 'test',
        };
        const login = {
            username: 'test',
            password: 'test',
        };

        it('expect to get 200 from /register', (done) => {
            request(app)
                .post('/register')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it.skip('expect to get 200 from /profile/:id/update', (done) => {
            request(app)
                .post('/profile/:id/update')
                .send(profile)
                .expect(301)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect to get 302 from /login', (done) => {
            request(app)
                .post('/login')
                .send(login)
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
