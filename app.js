// majority courtesy of freecodecamp at https://github.com/freeCodeCamp/boilerplate-project-timestamp/blob/gomix/server.js

const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors({optionsSuccessStatus: 200}))

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

// Timestamp server solution
app.get('/timestamp', function(req, res) {
    res.sendFile(__dirname + '/views/timestamp.html')
})

app.get('/api/timestamp/:date_string?', function(req, res) {
    let date;
    if (!req.params.date_string) {
        date = new Date()
    } else {
        let nonDigitRegex = /\D/
        if (nonDigitRegex.test(req.params.date_string)) {
            date = new Date(req.params.date_string)
        } else {
            date = new Date(Number(req.params.date_string))
        }
    }
    if (date.toUTCString() === 'Invalid Date') {
        return res.json({"error": "Invalid Date"})
    }
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
})

// Request Header Parser solution
app.get('/headerparser', function(req, res) {
    res.sendFile(__dirname + '/views/header-parser.html')
})

app.get('/api/whoami', function(req, res) {
    res.json({
        "ipaddress": req.headers.forwarded === undefined ? req.headers.host : req.header.forwarded,
        "language": req.headers["accept-language"],
        "software": req.headers["user-agent"]
    })
})

// URL shortener solution
app.get('/url-shortener', function(req, res) {
    res.sendFile(__dirname + '/views/url-shortener.html')
})

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});