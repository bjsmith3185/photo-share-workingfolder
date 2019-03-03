const router = require("express").Router();
const picturesRoutes = require("./picturesRouter");
const usersRoutes = require("./usersRouter");
const commentsRoutes = require("./commentsRouter");
const displayPicturesRoutes = require("./displayPicturesRouter");
const awsRoutes = require("./awsRouter");
const systemRoutes = require("./systemRouter");

//  routes
router.use("/pictures", picturesRoutes);
router.use("/users", usersRoutes);
router.use("/comments", commentsRoutes);
router.use("/display", displayPicturesRoutes);
router.use("/aws", awsRoutes);
router.use("/system", systemRoutes)

// populate routes
// router.use("/populate", populateRoutes);


module.exports = router;
