const mongoose = require("mongoose");


const initDB = () => {
    return new Promise((resolve, reject) => {

        mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/EventsDB",
            { useNewUrlParser: true })// flag to allow users to fall back to the old parser if they find a bug in the new parser

        mongoose.connection.once("open", () => {
            console.log("Connected to local DB");
            resolve();
        })
    })
}


module.exports = initDB;