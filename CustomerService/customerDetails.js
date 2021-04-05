const mongoose = require("mongoose")

mongoose.model('Customer', {
    name: {
        type: String,
        require: true
    },
    DateOfBirth: {
        type: Number, 
        require: true
    },
    Address: {
        type: String,
        require: True
    }
})