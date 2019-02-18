const router = require("express").Router();
const email = require("../nodeMailer/passwordReset");

// should match to /system/password

router.route("/")
    .put((req, res) => {

        email.emailPassword(req.body.email, req.body.password)
 
        res.json("password emailed")

    });













module.exports = router;



// module.exports = {

//     addSecretAnswer: function (email, question, answer) {
//         return new Promise((resolve, reject) => {

//             resolve(dbresults);
//         })





//     },

//     selectSecretQuestion: function () {
//         const SecretQuestionsArray = [
//             "What is your favorite pet?",
//             "In what city were you born?",

//         ];

//         return SecretQuestionsArray;


//     }



// };