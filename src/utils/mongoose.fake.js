const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongoServer;

const connect = async () => {
  console.log("Fake Memory DB connected");
  if (mongoServer == null) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log(mongoUri);
    await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
};

const clear = async () => {
  if (mongoServer != null && mongoose.connection.readyState) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany();
    }
  }
};

const stop = async () => {
  if (mongoServer != null && mongoose.connection.readyState) {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("Fake Memory DB disconnected");
  }
};

module.exports = {
  connect,
  stop,
  clear,
};
