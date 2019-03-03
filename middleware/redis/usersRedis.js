const users = require("../../controllers/usersController");

const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);


module.exports = {

    redisForUsers: function (id) {
        // console.log("this si the users id before checking cache, line 13: " + id)
        return new Promise((resolve, reject) => {
        // do we have any cached data related to this query
        client.get(id)
            .then(result => {
                // console.log("promise from clietn.get()")
                // console.log(result)
                // if yes, then respond to teh request right away
                if (result) {
                    console.log("returning User from Cache")
                   
                    return resolve(JSON.parse(result))
                }

                // if no, we need to reapond to request and update our cache.
                users.findById(id)
                    .then(dbresults => {
                        console.log("returning from Mongo")
                        

                        client.set(id, JSON.stringify(dbresults))
                        resolve(dbresults);
                    })
                    .catch(err => res.status(422).json(err))
            })
            .catch(err => res.status(422).json(err))

        })
    }



}










