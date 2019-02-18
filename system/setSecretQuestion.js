const router = require("express").Router();


router.route("/")
    .get((req, res) => {
       
        const secretQuestionsArray = [
            "What is your favorite pet?",
            "In what city were you born?",
            
        ];
        res.json(secretQuestionsArray)
    });

module.exports = router;


