const router = require("express").Router();
const displayPictures = require("../../controllers/displayPicturesController");
// const personalDisplayRouter = require("../personalizeDisplay/personalize");
const noteArea = require("../../middleware/addNotes/showNoteArea")


// route  /api/display

// route to open and close text box
router.route("/:id")
  .put((req, res) => {
   
    noteArea.showNote(req.params.id, req.body)
    .then(dbresults => {
    
      res.json(dbresults)
    })
    .catch(err => res.status(422).json(err))
    
  });


  module.exports = router;








// router.route("/")
//   .get((req, res) => {
//     displayPictures.findAll()
//       .then(dbresults => {
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });

// router.route("/")
//   .post((req, res) => {
//     displayPictures.create(req.body)
//     .then(dbresults => {
//       res.json(dbresults)
//     })
//     .catch(err => res.status(422).json(err))
// });

// router.route("/many")
//   .post((req, res) => {
//     displayPictures.createMany(req.body)
//     .then(dbresults => {
//       res.json(dbresults)
//     })
//     .catch(err => res.status(422).json(err))
// });

//===========================================================

// router.route("/:id")
//   .get((req, res) => {
//     displayPictures.findByUser(req.params.id)
//     .then(dbresults => {
//       res.json(dbresults)
//     })
//       .catch(err => res.status(422).json(err))
//   });




  // router.use("/favorite", personalDisplayRouter);



// router.route("/:picture")
//   .put((req, res) => {
//     comments.update(req.params.picture, req.body)
//       .then(dbresults => res.json(dbresults))
//       .catch(err => res.status(422).json(err))
//   });

// router.route("/")
//   .delete((req, res) => {
//     displayPictures.removeAll()
//       .then(dbresults => res.json(dbresults))
//       .catch(err => res.status(422).json(err))
//   });
  

// router.route("/:id")
//   .delete((req, res) => {
//     // console.log("deleting all user id's: " + req.params.id)
//     displayPictures.removeMany(req.params.id)
//       .then(dbresults => res.json(dbresults))
//       .catch(err => res.status(422).json(err))
//   });










