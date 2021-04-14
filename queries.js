const Pool = require('pg').Pool;
let url = require('url');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});



const registerPlayer = async (req, res) => {
    // const {q} = req.body;
    res.writeHead(200, {"Content-type" : "text/html", "Allow-Control-Allow-Origin" : "*"})
    const q = url.parse(req.url, true);
    const name = q.query["name"];
    const score = q.query["score"];
    console.log(`${name} from queries.js`);
    try {
        let results = await pool.query(`INSERT INTO players(name, score) VALUES($1, $2)`, [name, score])
        res.status(201).send(results.rows[0])

    } catch (error) {
        // res.status(500).send(error.stack)
        console.log(res.status(500).send(error.stack))
    }
}


const getUsers = (request, response) => {
    pool.query('SELECT * FROM players ORDER BY score DESC LIMIT 5', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}




module.exports = {
    registerPlayer, getUsers
}