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

    const update = () => {
        return Promise.resolve(items);
    };

    const updateMany = () => {
        return Promise.resolve(items);
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

    describe('filterBy method test:', () => {
        beforeEach(() => {
            items = ['test', 'test1'];
            sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { find };
                    });
            ModelClass = class {
            };

            data = new BaseData(db, ModelClass);
        });

         afterEach(() => {
            db.collection.restore();
        });

        it('expect to return created item', () => {
            return data.filterBy({ items: 'test' })
                .then((found) => {
                    expect(found).to.equal(items);
                });
        });
    });
    describe('update method test:', () => {
        beforeEach(() => {
            items = ['test'];
            sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { update };
                    });
            ModelClass = class {
            };

            data = new BaseData(db, ModelClass);
        });

         afterEach(() => {
            db.collection.restore();
        });

        it('expect to return updated item', () => {
            return data.update({ items: 'test' }, { items: 'test1' })
                .then((updated) => {
                    expect(updated).to.equal(items);
                });
        });
    });
    describe('update method test:', () => {
        beforeEach(() => {
            items = ['test', 'test1'];
            sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { updateMany };
                    });
            ModelClass = class {
            };

            data = new BaseData(db, ModelClass);
        });

         afterEach(() => {
            db.collection.restore();
        });

        it('expect to return updated item', () => {
            return data.updateMany({ items: 'test' }, { items: 'test1' })
                .then((updated) => {
                    expect(updated).to.equal(items);
                });
        });
    });
});
