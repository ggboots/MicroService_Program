const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json())

mongoose.connect('mongodb+srv://ggboots:HackMeMate@tua.mzh9z.mongodb.net/MSA_Database_Customer?retryWrites=true&w=majority;', {
    useNewUrlParser: true, useUnifiedTopology: true //Stops deprecationWarnings
})
 .then((results) => console.log('Database Connected'))
 .catch((err) => console.log(err));


require("./customerDetails") //name of file
const CustomerModel = mongoose.model("Customer")


app.post("/Customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        DateOfBirth: req.body.DateOfBirth,
        address: req.body.address
    }

    var customer = new CustomerModel(newCustomer)

    customer.save().then(() => {
        res.send("Customer Created")
    }).catch((err) => {
        if(err) {
            throw err;
        }
        
    })
    res.send("Details Recieved")
})


//Request to browser
//Search up entire database for customer
app.get("/customers", (req, res) => {
    Customer.find().then((customer) => {
        res.json(customer)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

//search specific customer in database
app.get("/customer/:id", (req, res) => {
    customer.findById(req.params.id).then((customer) => {
        if(customer){
            res.json(customer)
        }else {
            res.send("Error: Invalid ID")
        }
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
})

//delete specified customers from database
app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("Customer Deleted")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})


app.listen("3001", () => {
    console.log('Customer Service Server connected')
})