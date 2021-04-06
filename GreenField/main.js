const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const axios = require("axios") // http request
const mongoose = require('mongoose')
const { get } = require("request")

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://ggboots:HackMeMate@tua.mzh9z.mongodb.net/GreenFieldDB?retryWrites=true&w=majority;', {
    useNewUrlParser: true, useUnifiedTopology: true 
})
 .then((results) => console.log('Database Connected'))
 .catch((err) => console.log(err));

// load model
 require("./GreenField") //File location
 const GreenField = mongoose.model("GreenField")


app.post("/GreenField", (req, res) => {
    var newGreenFieldAccount = {

        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID), //Converts to objectId
        CreditCardID: mongoose.Types.ObjectId(req.body.CreditCardID),
        CreationDate: req.body.CreationDate,
        LastUsed: req.body.LastUsed
    }

    var GreenFieldAccount = new GreenField(newGreenFieldAccount)
    
    GreenFieldAccount.save().then(() => {
        res.send("Account Has been Created")
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.get("/greenfield", (req, res) => {

    GreenFieldAccount.find().then((credits) => {
        res.json(credits)
    }).catch((err) => {
        if (err) {
            throw err
        }
    })
})

//Display Information from other Microservices (CreditCard && Customer)
app.get("/order/:id", (req, res) => {
    GreenFieldAccount.findById(req.params.id).then((GreenFieldAccount) => {
        if(GreenFieldAccount){
                axios.get("http://localhost:3001/customer/" + GreenFieldAccount.CustomerID).then((response) => {
                    
                var GreenFieldAccountObject = {customerName: response.date.name, CreditCardID: ''}

                axios.get("http://localhost:3000/creditcard/" + ondragover.CreditCardID).then((response) => {
                    GreenFieldAccountObject.AccountNumber = response.data.AccountNumber
                    res.json(orderObject)
                })
            })
            
        }else{
            res.send("Invalid Order")
        }
    })
})
app.listen(1337, () => {
    console.log("Server Connected")
})