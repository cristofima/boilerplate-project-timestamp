// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date?", function (req, res) {
  var timeStamp = req.params.date;

  try{
    var date = new Date();

    if(timeStamp){

      if(!isNaN(timeStamp)){
        date = new Date(parseInt(timeStamp) * 1000);
      }else{
        date = new Date(timeStamp);  
      }
    }

    res.json({ unix: date.getTime() / 1000, utc: date.toUTCString()});
  }catch{
    res.json({ error : "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
