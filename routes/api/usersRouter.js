const router = require("express").Router();
const users = require("../../controllers/usersController");
const newUser = require("../../middleware/newUser/createNewUser")
const addRemoveFav = require("../../middleware/addRemoveFavorites/handleAddRemoveFav");
const cacheModule = require("../../middleware/redis/usersRedis");
const cache = require('../../middleware/redis/clearCache');

const redis = require('redis')
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');
client.get = util.promisify(client.get);

require('dotenv').load()


// Matches with "/api/users"

router.route("/")
  .get((req, res) => {
    users.findAll()
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

// going to hook up REDIS here
router.route("/:id")
  .get((req, res) => {

    cacheModule.redisForUsers(req.params.id)
    .then(result => {
      // console.log("back from cache or db")
      res.send(result)
    })
    .catch(err => res.status(422).json(err))

  });

  router.route("/new")
  .post((req, res) => {
    newUser.addUser(req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))

  });

  router.route("/id/:id")
  .put((req, res) => {
    users.updateById(req.params.id, req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

  router.route("/signout/:id")
  .put((req, res) => {
    let data = {
      loggedIn: false,
    }
    users.signout(req.params.id, data)
      .then(dbresults => {
        // clear redis cache for user id
        cache.clearRedisCache(req.params.id)
        .then(cacheBack => {
          // console.log(cacheBack)
        })

        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });


  router.route("/login/:email")
  .put((req, res) => {
    let data = {
      loggedIn: true,
    }
    users.login(req.params.email, req.body.password, data)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

  router.route("/:name")
  .put((req, res) => {
    users.update(req.params.name, req.body)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

// this route adds/removes favorites for specific user
router.route("/favorites/:id")
  .put((req, res) => {

    // send this data to a systems folder
    addRemoveFav.updateFav(req.params.id, req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });

  router.route("/:id")
  .delete((req, res) => {
    users.removeById(req.params.id)
      .then(dbresults => res.json(dbresults))
      .catch(err => res.status(422).json(err))
  });

  //------ is this one necessary
  router.route("/email/:email")
  .put((req, res) => {
    users.updateByEmail(req.params.email, req.body)
      .then(dbresults => {
        res.json(dbresults)
      })
      .catch(err => res.status(422).json(err))
  });
//------------------------


module.exports = router;











//------------------------------



// router.route("/online")
//   .get((req, res) => {
//     users.findByOnline({})
//       .then(dbresults => {
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });

// router.route("/email/:email")
//   .get((req, res) => {
//     users.findByEmail(req.params.email)
//       .then(dbresults => {
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });






// login



// signout




// find by name and populate pictures for favorites
// router.route("/favorites/:name")
//   .get((req, res) => {
//     users.findByNameAndPopulate(req.params.name)
//       .then(dbresults => {
//         res.json(dbresults)
//       })
//       .catch(err => res.status(422).json(err))
//   });


// update by email


// update by id



















