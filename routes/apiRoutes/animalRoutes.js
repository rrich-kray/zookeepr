const { filterByQuery, findById, createNewAnimal, validateAnimal } = require("../../lib/animals")
const { animals } = require('../../data/animals')
const router = require('express').Router()

router.get('/animals', (req, res) => { // the .get() method allows you to set up a route for a specific type of request. We make a GET request every time we enter a URL into the browser and press the Enter key to see what will come back in response.
    let results = animals;
    if (req.query) results = filterByQuery(req.query, results)
    res.json(results)
}) // when the urtl received from the client side is https://localhost3001/animals, code block checks for any query parameters in the url. If found, the filterByQuery function is run using the req.query instance of the req object as a parameter

router.get('/animals/:id', (req, res) => { // a param route must come AFTER the other GET route
    const result = findById(req.params.id, animals); // 
    if (result) res.json(result)
    else res.send(404)
}) // generally, req.query combines multiple parameters, whereas req.param is specific to a single property

router.post('/animals', (req, res) => { // route that listens for POST requests.  POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa.
    // set id based on what the index of the array will be
    req.body.id = animals.length.toString()
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.')
    } else {
        const animal = createNewAnimal(req.body, animals)
        res.json(animal)
    }
})  

module.exports = router

// sets up a GET route that parses query parameters from req object and runs filterByQuery if query parameters are found
// 