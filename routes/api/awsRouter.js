const router = require("express").Router();
const URL = require("../../middleware/aws/presignedUrl")




// route  /api/aws

router.route("/presignedurl/:id")
  .post((req, res) => {

    URL.requestUrl(req.params.id, req.body)
    .then(data => {
      res.send(data)
    })
    .catch(err => res.status(422).json(err))
   
  });

module.exports = router;





