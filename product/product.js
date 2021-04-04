
const express = require("express"); //gets package into file
const app = express();
const mongoose = require("mongoose"); //database access

// connect to mongodb
mongoose.connect('mongodb+srv://ggboots:HackMeMate@tua.mzh9z.mongodb.net/testDB?retryWrites=true&w=majority;', {
    useNewUrlParser: true, useUnifiedTopology: true //Stops deprecationWarnings
})
 .then((results) => console.log('connected to db'))
 .catch((err) => console.log(err));





/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ggboots:<Wii800ts99>@tua.mzh9z.mongodb.net/TUA?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/






app.use('/Microservice2', () => {
    console.log('this is middleware');
})

//Output to Web
app.get('/', (req, res) => {  // ('/', -> mean HomeURL
    res.send("Home URL");
})

app.get('/Microservice2', (req,res) => { // takes us to second microservice
    res.send('SecondMicroservice');
})

app.listen(3000, () => {
    console.log("Up and running");
})