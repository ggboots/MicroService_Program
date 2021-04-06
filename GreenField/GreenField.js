const mongoose = require('mongoose')

mongoose.model("GreenField", {
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    CreditCardID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    CreationDate: {
        type: Date,
        required: true
    },
    LastUsed: {
        type: Date,
        required: true
    }
})