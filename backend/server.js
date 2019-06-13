const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = require('./routes/routes');
const dbConfig = require('./config/db.cofig');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app)
const io = require("socket.io").listen(http)
mongoose.set('usecreateIndexes', true)
const chatcontroller=require('./controllers/chat.controller')
var users = [];
io.sockets.on("connection", function(socket)
{
        users.push(socket),
       // console.log("New User Connected")
        socket.on("new_msg", function(message){
            chatcontroller.message(message, (err,data) => {
                    if(err){
                        console.log('err')

                    }
                    else {
                        console.log(data)
                       io.emit('emitMsg', data);
                    }
                    io.emit(message.receiverID,message)
                    io.emit(message.senderID,message)
            })
       
    })

    socket.on("disconnect",function(){
        users.splice(users.indexOf(socket),1)
        console.log("User Disconnected: ")
    })
})

    

// create express app

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator());
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(allowCrossDomain);
app.use('/', router);


// Configuring the database

app.use(express.static('../frontend'))
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to chat app." });
});
// listen for requests
http.listen(4000, () => {
    console.log("Server is listening on port 4000");
})

