const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);



module.exports = {

    clearRedisCache: function (key) {
        // console.log("this is the user id before clearing cache, line 12: " + key)
        return new Promise((resolve, reject) => {

            client.del(key, function (err, response) {
                if (response == 1) {
                    console.log("delete cache")
                    resolve(response)
                } else {
                    console.log("did not delete cache, probably some issue with redis")
                    resolve(response)
                }
            })
        })

    }



}