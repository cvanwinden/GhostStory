//Ghost Story Game
const express = require('express');
const bodyParser = require("body-parser");
const Game = require("./Game");

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("www"));

let oGhostStory = {};

//each time the user presses enter go through this code
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    let aReply=[];
    res.setHeader('content-type', 'text/xml');
    if(!oGhostStory.hasOwnProperty(sFrom)){
        //start the game
        oGhostStory[sFrom] = new Game();
    }

    //get the message from the user
    let sMessage = req.body.Body|| req.body.body;
    
    aReply=oGhostStory[sFrom].choice(sMessage);
    let sResponse="<Response>";
    
    //output the computer message based on the choices the user makes
    for(let n = 0; n < aReply.length; n++){
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");

});

var port = process.env.PORT || parseInt(process.argv.pop()) || 8080;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
