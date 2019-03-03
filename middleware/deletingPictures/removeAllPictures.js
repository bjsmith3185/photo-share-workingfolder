const pictures = require("../../controllers/picturesController");
const aws = require("../aws/bucketAccess");

const redisCache = require("../redis/clearCache");

module.exports = {
  deleteAll: function(user_id) {
    return new Promise((resolve, reject) => {
      // console.log(id)
      // console.log(data.awsKey)
    
      pictures
        .removeAll()
        .then(dbresults => {

            // figure out how to delete all from awa

       
           aws.emptyBucket()

          // clear cache for all and favs

          let newKeyAll = user_id + "/allPics";
          redisCache
            .clearRedisCache(newKeyAll)
            .then(clearCacheAll => {
              console.log(clearCacheAll);
            })
            .catch(err => console.log(err));

          let newKeyFav = user_id + "/favPics";
          redisCache
            .clearRedisCache(newKeyFav)
            .then(clearCacheFav => {
              console.log(clearCacheFav);
            })
            .catch(err => console.log(err));

          resolve(dbresults);
        })
        .catch(err => console.log(err));
    });
  }
};
