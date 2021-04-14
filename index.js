const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const db = require('./queries')
const port = process.env.PORT || 3000
// app.use(cors())
app.use(cors({origin: '*'}))
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    // response.writeHead(200, {"Content-type" : "text/html", "Allow-Control-Allow-Origin" : "*"})
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/players', db.registerPlayer)

app.get('/leaderboard', db.getUsers)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})