// require in dbs
const displayPictures = require("../../controllers/displayPicturesController");
const users = require("../../controllers/usersController");
const useRedis = require("../redis/userFavPics")

module.exports = {
    FavoritePictures: function (id) {
        return new Promise((resolve, reject) => {

            // console.log("inside displayFavoritePictures.js,  line 12")
            // console.log(id)

            // send requrest to redis, check for saved values....
            useRedis.getRedisFavPics(id)
                .then(redisCheck => {
                    // console.log(redisCheck)
                    if (redisCheck) {
                        console.log("Favs from Cache< line 18")
                        return resolve(redisCheck);
                    } else {
                        let fav = [];
                        // empty collection displaypicture(userId)
                        displayPictures.removeMany(id)
                            .then(dbresults => {
                                // console.log("deleted all displayPictures documents with user id")
                                // console.log(dbresults)

                                // get all pictures
                                // pictures.findAll()
                                //     .then(allPics => {
                                // console.log("all pictures")
                                // console.log(allPics)

                                // get any user favorites saved
                                users.findUserFavorites(id)
                                    .then(favs => {
                                        // console.log("user fav results")
                                        // console.log(favs.favorites)

                                        if (favs.favorites.length === 0) {
                                            // console.log("there are no favorites")

                                            let data = [];

                                            resolve(data);
                                        }


                                        //===================================
                                        // console.log("there are favorites")
                                        for (var i = 0; i < favs.favorites.length; i++) {

                                            let data = {
                                                userId: id,
                                                picture: favs.favorites[i],
                                                showRed: true,
                                            }
                                            fav.push(data);

                                            if (i === favs.favorites.length - 1) {
                                                // console.log("finished loop")
                                                // console.log(fav)

                                                // put this array into the displayPictures collection
                                                displayPictures.createMany(fav)
                                                    .then(displayReady => {
                                                        // console.log("displaypicture array should be ready")
                                                        // console.log(displayReady)

                                                        // get displaypictures and popuate
                                                        displayPictures.findByUser(id)
                                                            .then(data => {
                                                                // console.log("populated displaypictures")
                                                                // console.log(data)

                                                                console.log("Favs From MongoDB, line 80")
                                                                // console.log("sending data to redis")
                                                                useRedis.setRedisFavPics(id, data)
                                                                    .then(setData => {
                                                                        // console.log(setData)

                                                                    })
                                                                    .catch(err => console.log(json(err)))

                                                                resolve(data);
                                                            })
                                                    })
                                                    .catch(err => console.log(json(err)))
                                            }
                                        }


                                    })
                                    .catch(err => console.log(json(err)))
                            })
                            .catch(err => console.log(json(err)))


                    }
                })
                .catch(err => console.log(json(err)))

        


        })
    }



}









