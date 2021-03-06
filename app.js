const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item is saved in DB");
    }).catch(()=>{
        res.status(400).send("The item could not be saved to the DB.");
    });
    //res.status(200).render('contact.pug');
});

app.listen(port, ()=>{
    console.log(`The application is running on port ${port}`);
});