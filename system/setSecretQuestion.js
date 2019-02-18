const router = require("express").Router();


router.route("/questions")
    .get((req, res) => {
       
        const secretQuestionsArray = [
            "What is your favorite pet?",
            "In what city were you born?",
            
        ];

        res.json(secretQuestionsArray)

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