const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

const UserData = require('../../../data/users.data');

describe('user.data methods tests:', () => {
    const db = {
        collection: () => { },
    };

    const callback = (boolean) => {
        if (boolean) {
            return true;
        }

        return boolean;
    };
    let data = null;
    let users = null;

    describe('checkIfUsernameAndEmailAreFree method test:', () => {
        beforeEach(() => {
            users = [{
                username: 'test',
                email: 'test',
            }];

            data = new UserData(db);

            sinon.stub(data, 'filterBy')
                    .callsFake(() => {
                        return Promise.resolve(users);
                    });
        });

        afterEach(() => {
            data.filterBy.restore();
        });

        it('expect method to return: username is already taken', () => {
            return data.checkIfUsernameAndEmailAreFree('test', 'test')
                .then((validator) => {
                    expect(validator.msg).to.eql('username is already taken');
                });
        });

        it('expect method to return: email is already in use', () => {
            return data.checkIfUsernameAndEmailAreFree('test1', 'test')
                .then((validator) => {
                    expect(validator.msg).to.eql('email is already in use');
                });
        });

        it('expect method to return: no errors', () => {
            return data.checkIfUsernameAndEmailAreFree('test1', 'test1')
                .then((validator) => {
                    expect(validator.msg).to.eql('no errors');
                });
        });
    });

    describe('comparePasswords method test:', () => {
        beforeEach(() => {
            data = new UserData(db);
        });

        afterEach(() => {
            bcrypt.compareSync.restore();
        });

        it('excpect comparePasswords to return true', () => {
            sinon.stub(bcrypt, 'compareSync')
                    .callsFake(() => {
                        return true;
                    });
            const result = data.
                comparePasswords(bcrypt, 'test', 'test', callback);
            expect(result).to.eql(true);
        });

        it('excpect comparePasswords to return false', () => {
            sinon.stub(bcrypt, 'compareSync')
                    .callsFake(() => {
                        return false;
                    });
            const result = data.
                comparePasswords(bcrypt, 'test', 'test1', callback);
            expect(result).to.eql(false);
        });
    });
});
