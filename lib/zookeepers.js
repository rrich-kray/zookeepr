const fs = require('fs')
const path = require('path')

const filterByQuery = (query, zookeepers) => {
    let filteredResults = zookeepers;
    if (query.age) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.age === Number(query.age)) // We receive the age as a string and must convert it to a number 
    }
    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.name === query.name)
    }
    return filteredResults;
}

const findById = (id, zookeepers) => {
    let result = zookeepers.filter(zookeeper => zookeeper.id === id)[0]; // will only return a single result, hence the [0]
    return result;
}

const createNewZookeeper = (body, zookeepers) => {
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, '..data/zookeepers.json'),
        JSON.stringify({ zookeepers }, null, 2)
    );
    return zookeeper;
}

const validateZookeeper = (zookeeper) => {
    if (!zookeeper.name || typeof zookeeper.name !== 'string') {
        return false
    }
    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false
    }
    if (!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false
    }
    return true
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
}