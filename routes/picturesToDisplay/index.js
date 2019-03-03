const router = require("express").Router();
require('dotenv').load();
const displayAll = require("../../middleware/picturesToDisplay/displayAllPictures");
const displayFav = require("../../middleware/picturesToDisplay/displayFavoritePictures")


// route  /api/system/displaypictures


router.route("/all/:id")
    .get((req, res) => {
        // console.log("inside the displaypictures server route")
        // console.log(req.params.id)

        displayAll.AllPictures(req.params.id)
        .then(data => {
            // console.log("return for displaypictures server route")
            // console.log(data)
            res.json(data)
        })
        .catch(err => console.log(json(err)))
    });


router.route("/fav/:id")
    .get((req, res) => {
        // console.log("inside the display favs server route")
        // console.log(req.params.id)
        displayFav.FavoritePictures(req.params.id)
        .then(data  => {
            // console.log("return for fav pics")
            res.json(data)
        })
        .catch(err => console.log(json(err)))
    });



module.exports = router;