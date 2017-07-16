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

  _getCollectionName() {
    return this.ModelClass.name.toLowerCase() + 's';
  }
}

module.exports = BaseMongodbData;
