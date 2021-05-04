require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    //connecting database
    mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });
    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('Database Successfully connected');
    }).catch(err => {
        console.log('Connection failed');
    });

    
}
module.exports = connectDB;