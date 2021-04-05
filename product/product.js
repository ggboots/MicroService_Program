
const express = require("express"); //gets package into file
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //database access

app.use(bodyParser.json());


require("./creditcard")
const CreditCardModel = mongoose.model("CreditCard")

// connect to mongodb
mongoose.connect('mongodb+srv://ggboots:HackMeMate@tua.mzh9z.mongodb.net/MSA_Database?retryWrites=true&w=majority;', {
    useNewUrlParser: true, useUnifiedTopology: true //Stops deprecationWarnings
})
 .then((results) => console.log('Database Connected'))
 .catch((err) => console.log(err));

//Output to Web
app.get('/', (req, res) => {  // ('/', -> mean HomeURL
    res.send("Home URL");
})

// Pass information to db
app.post('/creditcard', (req, res) => { // takes us to second microservice
    var newCredit = {
        AccountHolder: req.body.AccountHolder,
        AccountNumber: req.body.AccountNumber,
        AccountType: req.body.AccountType
    }

    var credit = new CreditCardModel(newCredit)

    credit.save().then(() => {
        console.log("New Credit details recorded")
    }).catch((err) => {
        throw err;
        })
    res.send("Credit Details Successfully Recorded") //sends response to browser
})

app.get("/credits", (req, res) => {

    CreditCardModel.find().then((credits) => {
        res.json(credits)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.get("/credits/:id", (req, res) => {
    CreditCardModel.findById(req.params.id).then((credit) => {

        if(credit){
            res.json(credit)
        } else{
            res.sendStatus(404);
        }

    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

app.delete("/credits/:id", (req, res) => {
    CreditCardModel.findOneAndRemove(req.params.id).then(() => {
        res.send("Account removal success")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


app.listen(3000, () => {
    console.log("Server Connected");
})
