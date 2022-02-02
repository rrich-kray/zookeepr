const router = require('express').Router()
const path  = require('path')

router.get('/', (req, res) => { // '/' is the root of the server and where we will create our homepage for the server. his GET route has just one job to do, and that is to respond with an HTML page to display in the browser.
    res.sendFile(path.join(__dirname, '../../public/index.html')) // We use the path module to ensure that this would work in any environment
})

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'))
})

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'))
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html')) // The * will act as a wildcard, meaning any route that wasn't previously defined will fall under this request and will receive the homepage as the response. Thus, requests for /about or /contact or /membership will essentially be the same now.
}) // this should always come last, otherwise itr will taqke precendence over your other routes

module.exports = router