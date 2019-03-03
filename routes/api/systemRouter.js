const router = require("express").Router();
require('dotenv').load();
const picturesTodisplayRoutes = require("../picturesToDisplay")


// route  /api/system

router.use("/displaypictures", picturesTodisplayRoutes);


module.exports = router;





