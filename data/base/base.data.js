class BaseMongodbData {
  constructor(db, ModelClass) {
    this.db = db;
    this.ModelClass = ModelClass;
    this.collectionName = this._getCollectionName();
    this.collection = this.db.collection(this.collectionName);
  }

  create(model) {
    return this.collection.insert(model)
      .then(() => {
        return model;
      });
  }

  filterBy(props) {
    return this.collection.find(props)
      .toArray();
  }

  update(querry, prop) {
    return this.collection.update(querry, { $set: prop })
      .then((updated) => {
          return updated;
      });
  }

  updateMany(querry, prop) {
    return this.collection.updateMany(querry, { $set: prop })
      .then((updatedCollection) => {
        return updatedCollection;
      });
  }

  _getCollectionName() {
    return this.ModelClass.name.toLowerCase() + 's';
  }
}

module.exports = BaseMongodbData;
