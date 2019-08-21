const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// User Store
let users = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

/* GET About us page. */
router.get('/about', function(req, res, next) {
    res.render('about.ejs');
});

/* GET Profile page. */
router.get('/profile', function(req, res, next) {
    let selectedProfile = {
        id:"",
        first_name:"",
        last_name:"",
        email:"",
        gender:"",
        ip_address:""};
    res.render('profile.ejs',{selectedProfile : selectedProfile});
});

/* GET Profile page with query parameters */
router.get('/profile/:id', function(req, res, next) {
    let profileId = Number.parseInt(req.params.id);
    // Reading the profiles.json file
    fs.readFile(path.join(__dirname,'..' , 'data' , 'profiles.json'),'utf8',(err,data) => {
        if(err){
            throw  err;
        }
        let profiles = JSON.parse(data);
        let selectedProfile = profiles.find(function(profile) {
            return profile.id === profileId;
        });
        if(selectedProfile !== undefined){
            res.render('profile.ejs',{selectedProfile : selectedProfile});
        }
        else{
            let selectedProfile = {
                id:"",
                first_name:"",
                last_name:"",
                email:"",
                gender:"",
                ip_address:""};
            res.render('profile.ejs',{selectedProfile : selectedProfile});
        }

    });
});

/* GET services page. */
router.get('/services', function(req, res, next) {
    res.render('services.ejs', {users : users});
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact.ejs');
});

/* Registration Form */
router.post('/register', urlencodedParser ,function(req, res, next) {
    let userInfo = req.body;
    // data to database
    users.push(userInfo);
    console.log(userInfo);
    res.render('contact-success.ejs',{userInfo : userInfo});
});

module.exports = router;
