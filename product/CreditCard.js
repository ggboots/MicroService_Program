const mongoose = require("mongoose");

mongoose.model("CreditCard", {
    
    AccountHolder: {
        type: String,
        require: true
    },
    AccountNumber: {
        type: Number,
        require: true
    },
    AccountType: {
        type: String,
        require: true
    },
});