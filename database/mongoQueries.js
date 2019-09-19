/* eslint-disable no-console */
const assert = require('assert');
const { getUserDatabase } = require('./mongoDB.js');

const getCosmicMonth = async (month) => {
  try {
    const collection = await getUserDatabase().collection('months');
    const result = await collection
      .find({ month }, { projection: { _id: 0 } })
      .limit(1)
      .toArray();
    // assert.strictEqual(1, result.length);
    return result;
  } catch (err) {
    console.log(err);
  }
};

const postCosmicMonth = async (cosmicMonth) => {
  try {
    const collection = await getUserDatabase().collection('months');
    await collection.insertOne(cosmicMonth);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getCosmicMonth, postCosmicMonth };
