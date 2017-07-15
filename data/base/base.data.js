class BaseMongodbData {
  constructor(db, ModelClass, validator) {
    this.db = db;
    this.ModelClass = ModelClass;
    this.validator = validator;
    this.collectionName = this._getCollectionName();
    this.collection = this.db.collection(this.collectionName);
  }

  create(model) {
    this.db.collection.insert(model);
  }

  _getCollectionName() {
    return this.ModelClass.name.toLowerCase() + 's';
  }
}

module.exports = BaseMongodbData;
