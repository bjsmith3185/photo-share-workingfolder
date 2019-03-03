const users = require("../../controllers/usersController");

const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);


module.exports = {

    getRedisAllPics: function (id) {
        // console.log("this is the users id before checking cache, line 13: " + id)
        return new Promise((resolve, reject) => {
            // do we have any cached data related to this query

            // create a new key that includes unique identifyer for all pictures
            let newKeyAll = id + "/allPics";
            // console.log(newKey)
            // check redis for key/value data
            client.get(newKeyAll)
                // if true return the data
                // if false return and perform query to mongo
                .then(result => {
                    // console.log("promise from clietn.get()")
                    // console.log(result)
                    // if yes, then respond to teh request right away
                    if (result) {
                        // console.log("returning from Cache")

                        return resolve(JSON.parse(result))
                    }

                    return resolve(false)

                })
                .catch(err => res.status(422).json(err))

        })
    },

    setRedisAllPics: function (id, results) {
        return new Promise((resolve, reject) => {
            // console.log("@@@@@@@@@@@@@@@2inside the set redis()")
            // console.log(id)
            // console.log(results)
            let newKey = id + "/allPics";
            // console.log(newKey)

            client.set(newKey, JSON.stringify(results))
            resolve("added to redis");

        })

    }


}










