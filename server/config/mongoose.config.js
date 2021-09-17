const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/authordb')
    .then(() => console.log("DB connection established"))
    .catch(err => console.log('Something went wrong', err))
