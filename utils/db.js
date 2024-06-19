const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
let client = new MongoClient(uri, { useUnifiedTopology: true });

class DBClient {
  constructor() {
    this.db = null;
    this.connected = false;
    this.connect();
  }

  async connect() {
    try {
      await client.connect();
      this.db = client.db('mydatabase');
      this.connected = true;
      console.log('Connected successfully to MongoDB');
    } catch (e) {
      console.error('Error connecting to MongoDB', e);
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

module.exports = new DBClient();
