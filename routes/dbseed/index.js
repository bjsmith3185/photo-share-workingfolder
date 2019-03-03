const router = require("express").Router();
const populateUsersRoutes = require("./populateUsersRouter");


//  routes /populate/user
router.use("/users", populateUsersRoutes);



module.exports = router;
