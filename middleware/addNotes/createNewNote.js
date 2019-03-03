const displayPictures = require("../../controllers/displayPicturesController");
const pictures = require("../../controllers/picturesController");
const comments = require("../../controllers/commentsController");
const displayFavs = require("../picturesToDisplay/displayFavoritePictures");
const displayAll = require("../picturesToDisplay/displayAllPictures")



module.exports = {
    addNote: function (data) {
        return new Promise((resolve, reject) => {
            let user_id = data.user_id;
            let text = data.text;
            let picture_id = data.picture_id;
            let fav = data.fav;

            let newComment = {
                text: text,
                author: user_id
            }

            comments.create(newComment)
                .then(result => {

                    let picNote = {
                        $push: { notes: result._id }
                    }

                    // now send the comment _id to the picture document
                    pictures.update(picture_id, picNote)
                        .then(result2 => {
                            // check to see if the user was viewing favs
                            // or all pictures and return that data
                            if (fav) {
                                displayFavs.FavoritePictures(user_id)
                                    .then(dbresult => {
                                        resolve(dbresult)
                                    })
                                    .catch(err => console.log(err))
                            } else {
                                displayAll.AllPictures(user_id)
                                    .then(dbresult => {
                                        resolve(dbresult)
                                    })
                                    .catch(err => console.log(err))
                            }

                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))

        })
    }
};
