const { MongoClient } = require('mongodb');
const { URI } = require('./mongo.config.json');

const options = {
  useNewUrlParser: true,
};

const databases = {};

async function connect(uri, database) {
  const client = await MongoClient.connect(uri, options);
  return client.db(database);
}

async function initializeDatabases() {
  const moonar = await connect(
    URI,
    'moonar',
  );
  databases.moonar = moonar;
}

function getUserDatabase() {
  return databases.moonar;
}

module.exports = { getUserDatabase, initializeDatabases };
