const fs = require('fs')
const path = require('path')

const express = require('express')
const PORT = process.env.PORT || 3001
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true })) // This is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object.
// The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
// parse incoming JSON data
app.use(express.json()) // app.use() mount functions to our server through which requests will pass before reaching their endpoint. These functions are known as middleware. 
// Takes incoming post data in the form of JSON and parses it into the req.body javascript object. 
const { animals } = require('./data/animals.json')

// app.get('/api/animals', (req, res) => { // first parameter is a string that describes the route that the client will fetch from. Second is a callback function that will be executed every time the route is accessed.
//     res.json(animals) // this sends the string 'hello' back to the client
// }) // to send JSON, you can just change .send() to .json()

const filterByQuery = (query, animalsArray) => {
    let personalityTraitsArray = [];
    // We save the animalArray as filteredResults here;
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personality traits as a dedicated array
        // if personality traits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        } else {   
            personalityTraitsArray = query.personalityTraits;
        }

        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.perconalityTraits.indexOf(trait) !== -1)
        })
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species)
    };
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    return filteredResults
}

const findById = (id, animalsArray) => {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    if (result) res.json(result);
    else res.send(404)
}

const createNewAnimal = (body, animalsArray) => { // body is POST routes req.body, animalsArray is the array we will add the data to
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2) // null arguments indicates that wew don't want to edit any of our existing data; the 2 adds whitespace between our values to make them more readable
    );
    // return finished code to post route for response
    return animal;
}

const validateAnimal = (animal) => {
    if (!animal.name || typeof animal.name !== 'string') return false;
    if (!animal.species || typeof animal.species !== 'string') return false;
    if (!animal.diet || typeof animal.diet !== 'string') return false;
    if (!animal.personalityTraits || Array.isArray(animal.personalityTraits)) return false;
    return true
}

app.get('/api/animals', (req, res) => { // the .get() method allows you to set up a route for a specific type of request. We make a GET request every time we enter a URL into the browser and press the Enter key to see what will come back in response.
    let results = animals;
    if (req.query) results = filterByQuery(req.query, results)
    res.json(results)
})

app.get('/api/animals/:id', (req, res) => { // a param route must come AFTER the other GET route
    const result = findById(req.params.id, animals); // We can't use the filterByQuery function because that is designed to return more than one result, whereas this function will only return a single animal
    res.json(result)
}) // generally, req.query combines multiple parameters, whereas req.param is specific to a single property

app.post('/api/animals', (req, res) => { // route that listens for POST requests.  POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa.
    // set id based on what the index of the array will be
    req.body.id = animals.length.toString()
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.')
    } else {
        const animal = createNewAnimal(req.body, animals)
        res.json(animal)
    }
})  

// Accepting data from a client can be risky. While we expect to receive the type of data we asked for, there is nothing stopping a user from sending incorrect or malicious data to our server. For this reason, there are validation libraries that ensure (on the server side) that the data meets certain criteria.
app.listen(PORT, () => { // this can be placed before or after the GET functions
    console.log(`API server now on port ${PORT}!`)
})

// can do Heroku create in terminal, so that you'd have separate remote for Heroku
// can connect git to heroku. Can 
// Look for deploy tab, and you can add a repo. can turn on automatic deploy. It's aq lot simpler to set that up