const router = require('express').Router()

router.use(require('../apiRoutes/animalRoutes'))
router.use(require('./zookeeperRoutes'))

module.exports = router

// organizing your code  - can separate out the back end and front-end routes 
// Routes for just interacting with animals
// Have an animal routes file - all of your routes should be /animal, and it should be your single endpoint
// Same reason that if you need a class, you use a separate file for that class so you can reuse it as needed.