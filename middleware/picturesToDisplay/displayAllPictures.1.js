// require in dbs
const displayPictures = require("../../controllers/displayPicturesController");
const users = require("../../controllers/usersController");
const pictures = require("../../controllers/picturesController");



module.exports = {
    AllPictures: function (id) {
        return new Promise((resolve, reject) => {

            // console.log("inside displayAllPictures.js, AllPictures() line 12")
            // console.log(id)
            let all = [];
            let fav = [];

            // empty collection displaypicture(userId)
            displayPictures.removeMany(id)
                .then(dbresults => {
                    // console.log("deleted all displayPictures documents with user id")
                    // console.log(dbresults)

                    // get all pictures
                    pictures.findAll()
                        .then(allPics => {
                            // console.log("all pictures")
                            // console.log(allPics)

                            // get any user favorites saved
                            users.findUserFavorites(id)
                                .then(favs => {
                                    // console.log("user fav results")
                                    // console.log(favs.favorites)

                                    if (favs.favorites.length === 0) {
                                        //===================================
                                        console.log("there are  no favorites")
                                        for (var i = 0; i < allPics.length; i++) {

                                            let noFav = {
                                                userId: id,
                                                picture: allPics[i]
                                            }
                                            all.push(noFav);

                                            if (i === allPics.length - 1) {
                                                // console.log("finished loop")
                                                // console.log(all)

                                                // put this array into the displayPictures collection
                                                displayPictures.createMany(all)
                                                    .then(displayReady => {
                                                        // console.log("displaypicture array should be ready")
                                                        // console.log(displayReady)

                                                        // get displaypictures and popuate
                                                        displayPictures.findByUser(id)
                                                            .then(data => {
                                                                // console.log("populated displaypictures")
                                                                // console.log(data)
                                                                resolve(data);
                                                            })
                                                    })
                                                    .catch(err => console.log(json(err)))
                                            }
                                        }

                                        //====================================
                                    } else {
                                        // console.log("there are favorites")
                                        // console.log(favs.favorites.length)
                                        // console.log(allPics.length)

                                        //++++++++++++++++++++++++++++++++++++++++++++++++++
                                        let mixedArray = [];
                                   
                                        for (var k = 0; k < allPics.length; k++) {
                                            // console.log(allPics[k]._id)
                                            // console.log(favs.favorites[0])

                                            let newData = {
                                                userId: id,
                                                picture: allPics[k],
                                                showRed: false,
                                            }

                                            for (var t = 0; t < favs.favorites.length; t++) {
                                                if (allPics[k]._id.toString() === favs.favorites[t].toString()) {
                                                    // console.log("they match")
                                                    newData = {
                                                        userId: id,
                                                        picture: allPics[k],
                                                        showRed: true,
                                                    }
                                                }
                                            }

                                            mixedArray.push(newData)
                                            if (k === allPics.length - 1) {
                                                // console.log("finished")
                                                // console.log(mixedArray)
                                                displayPictures.createMany(mixedArray)
                                                    .then(done => {
                                                        // console.log("created display array with mixed favs")
                                                        // console.log(done)
                                                        resolve(done);
                                                    })
                                                    .catch(err => console.log(json(err)))
                                            }
                                        }
                                    }
                                })
                                .catch(err => console.log(json(err)))
                        })
                        .catch(err => console.log(json(err)))
                })
                .catch(err => console.log(json(err)))
        })
    }



}









