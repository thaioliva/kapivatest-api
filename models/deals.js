
const modelName = 'deals';

const insert = async (data) => {
  try {
    const collection = await global.db.collection(modelName);
    const result = await collection.insert(data);
    if (!result.insertedCount) {
      return [];
    }
    return result;
  } catch (err) {
    return err;
  }
};

const getAll = async (criteria) => {
  try {
    const collection = await global.db.collection(modelName);
    const result = await collection.find(criteria).toArray();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  insert,
  getAll
}
