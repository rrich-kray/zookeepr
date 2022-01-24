const express = require('express')
const PORT = process.env.PORT || 3001
const app = express();
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

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.listen(3001, () => {heroku 
})