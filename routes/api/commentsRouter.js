const router = require("express").Router();
const comments = require("../../controllers/commentsController");
const makeNote = require("../../middleware/addNotes/createNewNote");




// route  /api/comments

router.route("/")
  .post((req, res) => {
    makeNote.addNote(req.body)
    .then(dbresults => {
      res.json(dbresults)
    })
    .catch(err => res.status(422).json(err))

});


module.exports = router;





// router.route("/")
//   .get((req, res) => {
//     comments.findAll()
//       .then(dbresults => {
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });



// router.route("/:comment")
//   .get((req, res) => {
//     comments.findByPicture({_id: req.params.comment})
//     .then(dbresults => {
//       res.json(dbresults)
//     })
//       .catch(err => res.status(422).json(err))
//   });


// router.route("/:comment")
//   .put((req, res) => {
//        comments.update(req.params.comment, req.body)
//       .then(dbresults => {
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });



// router.route("/:comment")
//   .delete((req, res) => {
//     comments.remove({_id: req.params.comment})
//       .then(dbresults => res.json(dbresults))
//       .catch(err => res.status(422).json(err))
//   });










