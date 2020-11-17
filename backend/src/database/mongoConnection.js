require('dotenv').config();
const { MongoClient } = require('mongodb');

const clientMongo = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });

clientMongo.connect();


module.exports = clientMongo;