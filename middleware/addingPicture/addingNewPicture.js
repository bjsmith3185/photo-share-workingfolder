const pictures = require("../../controllers/picturesController");
const redisCache = require('../redis/clearCache')



module.exports = {
    newPic: function (id, data) {
        return new Promise((resolve, reject) => {
            // console.log("$$$$$$$$$$$$$$$$$$$$4")
            // console.log(id)
            // console.log(data)

            // need id to make allpickey with
            let newKeyAll = id + "/allPics";
            // need data to create new pic document


            pictures.create(data)
                .then(dbresults => {
                    // clear cache
                    redisCache.clearRedisCache(newKeyAll)
                        .then(done => {
                            console.log(done)
                        })
                        .catch(err => console.log(err))
                   resolve(dbresults)
                })
                .catch(err => console.log(err))
        })
    }
}
