const router = require("express").Router();
const questionsRoute = require("./setSecretQuestion");
const passwordRoute = require("./emailPassword");


//  routes
router.use("/questions", questionsRoute);
router.use("/password", passwordRoute);



module.exports = router;