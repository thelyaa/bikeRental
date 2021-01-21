const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb+srv://thelyaa:Fkm,tlj1@cluster0.lxn7u.mongodb.net/bikeRental', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var Schema = mongoose.Schema;
const UserModel = mongoose.model('users', new Schema({ 
    _email: String, 
    _password: String,
    _firstName: String,
    _lastName: String,
    _country: String,
    _role: String,
}));

const RentalList = mongoose.model('rentals', new Schema({
    _pin: String,
    _userId: mongoose.Types.ObjectId,
    _active: Boolean,
    _finishedDate: Date
}))

app.post('/signInFunction', (req, res) => {
    UserModel.find({
        _email: req.query.email,
        _password: req.query.password
    }, function(err, result){
//        console.log(result)
        res.send(result)
    });
})

app.post('/registrateUser', (req, res) => {
    UserModel.create({
        _firstName: req.query.firstName,
        _lastName: req.query.lastName,
        _email: req.query.email,
        _password: req.query.password,
        _role: "user"
    }, function(err, result){
//        console.log(result)
        res.send(result)
    });
})

app.get('/getRentalList', (req, res) => {
    RentalList.find({}, function(err, result){
        console.log("rentalist", result)
        res.send(result)
    })
})

app.post('/getUserName', (req, res) => {
//    console.log("id", req.query.userId)
    UserModel.find({_id: mongoose.Types.ObjectId(req.query.userId)}, function(err, result){
//        console.log(result)
        res.send(result)
    })
})

app.post('/finishRental', (req, res) => {
    RentalList.updateOne({_pin: req.query.pin}, {_active: false}, function(err, result){
        console.log(result)
    })
})

const PORT = 9000

app.listen(PORT, () => console.log('server started'));