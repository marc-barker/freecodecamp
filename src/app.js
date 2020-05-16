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

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});