const mongoose = require('mongoose')

// create a new schema
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [3, "{PATH} must be at leaset 3 characters long"]
    }, 
    age: {
        type: Number,
        default: 0
    },

    followingStatus: {
        type: [Number],
        default: [0, 0, 0]
    }
}, { timestamps: true })

// instantiate the schema and export it
module.exports.Author = mongoose.model('Authors', AuthorSchema);
