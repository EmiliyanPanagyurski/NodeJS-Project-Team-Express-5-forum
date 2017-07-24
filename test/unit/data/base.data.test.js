const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('base.data methods tests:', () => {
    const db = {
        collection: () => { },
    };
    let items = null;

    let ModelClass = null;
    let data = null;

    const toArray = () => {
        return Promise.resolve(items);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    const insert = () => {
        return Promise.resolve();
    };

    describe('create method test:', () => {
        beforeEach(() => {
            items = 'test';
            sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { insert };
                    });
            ModelClass = class {
            };

            data = new BaseData(db, ModelClass);
        });

         afterEach(() => {
            db.collection.restore();
        });

        it('expect to return created item', () => {
            return data.create(items)
                .then((created) => {
                    expect(created).to.equal(items);
                });
        });
    });
});
