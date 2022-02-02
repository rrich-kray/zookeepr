const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true })) // This is a method built into Express.js. It takes incoming POST data and converts it to key/value pairings that can be accessed in the req.body object.
// The extended: true option set inside the method call informs our server that there may be sub-array data nested in it as well, so it needs to look as deep into the POST data as possible to parse all of the data correctly.
// parse incoming JSON data
app.use(express.json()) // app.use() mount functions to our server through which requests will pass before reaching their endpoint. These functions are known as middleware. 
// Takes incoming post data in the form of JSON and parses it into the req.body javascript object. 
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
app.use(express.static('public')) // Function that allows the user to specify a root folder from which the server will serve static assets. This instructs the server to make files in the 'public' path static resources. This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
const { animals } = require('./data/animals.json')

// app.get('/api/animals', (req, res) => { // first parameter is a string that describes the route that the client will fetch from. Second is a callback function that will be executed every time the route is accessed.
//     res.json(animals) // this sends the string 'hello' back to the client
// }) // to send JSON, you can just change .send() to .json()

// Accepting data from a client can be risky. While we expect to receive the type of data we asked for, there is nothing stopping a user from sending incorrect or malicious data to our server. For this reason, there are validation libraries that ensure (on the server side) that the data meets certain criteria.
app.listen(PORT, () => { // this can be placed before or after the GET functions
    console.log(`API server now on port ${PORT}!`)
}) // app.listen() should always be last

// any time we make a request to the server, it looks at every single route we've explicitly created. If it doesn't find a matching route name, it will think that there's something wrong and won't provide a response.
// When you want to see a page, you go to the server's route that displays it.
// Over the last three lessons, you touched on almost everything that a typical web server does in modern web development. As you grow as a developer, you'll find that building a server is actually just a lot of repetition where the only thing that really changes is the specific data you're interacting with.


// can do Heroku create in terminal, so that you'd have separate remote for Heroku
// can connect git to heroku. Can 
// Look for deploy tab, and you can add a repo. can turn on automatic deploy. It's aq lot simpler to set that up