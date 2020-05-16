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

app.get('/timestamp', function(req, res) {
    res.sendFile(__dirname + '/views/timestamp.html')
})

// Timestamp server solution
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

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});