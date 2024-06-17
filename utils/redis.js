const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log('Redis Client Error', err);
    })
  }
  isAlive() {
    return this.client.connected;
  }
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          return reject(err);
        }
        resolve(value);
      });
    });
  }
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration,(err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      });
    });
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
