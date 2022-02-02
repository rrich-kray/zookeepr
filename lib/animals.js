const fs = require('fs')
const path = require('path')


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
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1)
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
    return result
}

const createNewAnimal = (body, animalsArray) => { // body is POST routes req.body, animalsArray is the array we will add the data to
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2) // null arguments indicates that wew don't want to edit any of our existing data; the 2 adds whitespace between our values to make them more readable
    );
    // return finished code to post route for response
    return animal;
}

const validateAnimal = (animal) => {
    if (!animal.name || typeof animal.name !== 'string') return false;
    if (!animal.species || typeof animal.species !== 'string') return false;
    if (!animal.diet || typeof animal.diet !== 'string') return false;
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) return false;
    return true
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
}