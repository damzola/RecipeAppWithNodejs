const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errors:'));

db.once('open', function(){
    console.log("connection successful")
});

//model 
require("./Category");
require("./Recipe");
