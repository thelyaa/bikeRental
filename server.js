const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const cors = require('cors');
const Math = require('mathjs')
app.use(cors());

mongoose.connect('mongodb+srv://<nickname>:<password>@cluster0.lxn7u.mongodb.net/bikeRental', {
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
    _finishedDate: Date,
    _userName: String,
    _createdDate: Date
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
//        console.log("rentalist", result)
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
    var datetime = new Date();
    RentalList.updateOne({_pin: req.query.pin}, {_active: false, _finishedDate: datetime}, function(err, result){
        RentalList.find({_pin: req.query.pin}, function(err, data){
            console.log("finish", data)
            res.send("success")
        })
        
    })
})

app.post('/getUserRentals', (req, res) => {
   UserModel.find({_email: req.query.email}, function(err, result){
       console.log(result[0]._id)
       RentalList.find({_userId: result[0]._id}, function(err, data){
//           console.log(data)
           res.send(data)
       })
   }) 
})

app.post('/rentalBike', (req, res) => {
    var datetime = new Date();
    var min = Math.ceil(111);
    var max = Math.floor(999);
    var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
    
    RentalList.find({_pin: rnd, _active: false}, function(err, rental){
        UserModel.find({_email: req.query.email}, function(err, result){
            RentalList.find({_userId: result[0]._id, _active: true}, function(err, active){
                if (active.length > 0) {
                    res.send("error"); 
//                  console.log("ac", active)
                }
                else{
                    RentalList.create({
                        _pin: rnd,
                        _userId: result[0]._id,
                        _userName: result[0]._firstName+' '+result[0]._lastName,
                        _finishedDate: null,
                        _createdDate: datetime,
                        _active: true
                    }, function(err, data){
                        console.log(data)
                        res.send("success")
                        if (err) console.log(err)
                    })
                }
            })      
        })
    })    
})
const PORT = 9000

app.listen(PORT, () => console.log('server started'));
