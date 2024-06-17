import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

// MongoDB Client Class
class DBClient {
    constructor() {
        this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,);
        this.isConnected = false;
        this.db = null;
        this.client.connect((err) => {
            if (err) {
                this.isConnected = true;
                this.db = this.client.db(DB_DATABASE);
            }
        });
    }
    isAlive() {
        return this.isConnected;
    }
    async nbUsers() {
        return this.db.collection('users').countDocuments();
    }
    async nbFiles() {
        return this.db.collection('files').countDocuments();
    }
}
const dbClient = new DBClient();
module.exports = dbClient;
