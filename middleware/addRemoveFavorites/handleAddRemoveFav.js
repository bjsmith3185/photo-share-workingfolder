
const addRemove = require("./userLogic");
const displayFavs = require("../picturesToDisplay/displayFavoritePictures");
const displayAll = require("../picturesToDisplay/displayAllPictures")
const redisCache = require('../redis/clearCache')




module.exports = {
    updateFav: function (id, data) {
        return new Promise((resolve, reject) => {

            console.log("inside updateFav, line 14")
            console.log(data)
            // inside data var, fav/all means the picture view
            // fav: false,
            // all: true,

            let picData = {
                _id: data._id
            }

            let fav = data.fav;
            let all = data.all;

            addRemove.update(id, picData)
                .then(results => {  // this result had new favs array

                    // here i should clear cache for: allPics and favPics

                    let newKeyAll = id + "/allPics";
                    redisCache.clearRedisCache(newKeyAll)
                        .then(clearCacheAll => {
                            console.log(clearCacheAll)
                        })
                        .catch(err => console.log(err))

                    let newKeyFav = id + "/favPics";
                    redisCache.clearRedisCache(newKeyFav)
                        .then(clearCacheFav => {
                            console.log(clearCacheFav)
                        })
                        .catch(err => console.log(err))
                    //-----------------------------------

                    if (fav) {
                        displayFavs.FavoritePictures(id)
                            .then(result => {
                                resolve(result)
                            })
                            .catch(err => console.log((422).json(err)))
                    } else if (all) {
                        displayAll.AllPictures(id)
                            .then(result => {

                                // clear cache for user

                                // let newKey = id + "/allPics";
                                // redisCache.clearRedisCache(newKey)
                                // .then(clearCache => {
                                //     console.log(clearCache)
                                // })
                                // .catch(err => console.log(err))

                                resolve(result)
                            })
                            .catch(err => console.log(err))
                    }
                })
                .catch(err => console.log(err))
        })
    }
}



