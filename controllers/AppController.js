const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
    static async getStatus(req, res) {
        const redisStatus = redisClient.isAlive();
        const dbStatus = await dbClient.isAlive();
        res.status(200).json({ redis: redisStatus, db: dbStatus });
    }

    static async getStats(req, res) {
        const usersCount = await dbClient.nbUsers();
        const filesCount = await dbClient.nbFiles();
        res.status(200).json({ users: usersCount, files: filesCount });
    }
}

module.exports = AppController;
