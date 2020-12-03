const auth = require('express').Router();
const User = require('../models/User');
const { registerValidation }= require('../validation')

auth.post('/register', async (req,res) => {

    //Let's validate the data before we make a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = auth;