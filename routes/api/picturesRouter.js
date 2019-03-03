const router = require("express").Router();
const pictures = require("../../controllers/picturesController");
const removePic = require("../../middleware/deletingPictures/removePicture")
const addPic = require('../../middleware/addingPicture/addingNewPicture');
const removeAllPics = require('../../middleware/deletingPictures/removeAllPictures');


// route  /api/pictures

router.route("/")
  .get((req, res) => {
    pictures.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/deleteone/:id")
  .put((req, res) => {
    // send data to middle ware function
    removePic.deletePic(req.params.id, req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

router.route("/deleteall/:id")
  .delete((req, res) => {
    console.log("n the delete all (). user id: " + req.params.id);

    // send request to middleware
    removeAllPics.deleteAll(req.params.id)

    // pictures.removeAll()
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

  router.route("/:id")
  .post((req, res) => {
    addPic.newPic(req.params.id, req.body)
    // pictures.create(req.params.id, req.body)
      .then(dbresults => {
        res.send(dbresults)
      })
      .catch(err => res.status(422).json(err))

  });

// router.route("/")
//   .post((req, res) => {
//     pictures.create(req.body)
//       .then(dbresults => {
//         res.send(dbresults)
//       })
//       .catch(err => res.status(422).json(err))

//   });

module.exports = router;












// router.route("/:picture")
//   .get((req, res) => {
//     pictures.findByPicture(req.params.picture)
//       .then(dbresults => {
//         if (dbresults.encodedImage.contentType) {
//           res.contentType(dbresults.encodedImage.contentType);
//           return res.send(dbresults.encodedImage.data);
//         } else {
//           return res.json(dbresults);
//         }
//       })
//       .catch(err => res.status(422).json(err))
//   });

// route to add note
// router.route("/note/:picture")
//   .put((req, res) => {
//     // console.log("inside the add note route")
//     // console.log(req.params.picture)
//     // console.log(req.body)
//     pictures.addNote(req.params.picture, req.body)
//       .then(dbresults => {
//         // console.log("this is the return with populated note")
//         // console.log(dbresults)
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });



// router.route("/:id")
//   .put((req, res) => {
//     pictures.update(req.params.id, req.body)
//       .then(dbresults => {
//         // console.log("this is the return for update picture")
//         // console.log(dbresults)
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });















