const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date, // Should be converted before return it to user
        required: true
    },
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

// Create a Model based on that Schema 
module.exports = mongoose.model("Event",EventSchema);