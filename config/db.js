const mongoose= require('mongoose');

//db connection
mongoose.connect('mongodb://127.0.0.1/file_data');
const db= mongoose.connection;
//console.log("Database, ", db);
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function callback() {
    console.log('connection estabilished');
});
exports.db=db;