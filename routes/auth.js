const auth = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation}= require('../validation')

// Register process
auth.post('/register', async (req,res) => {

    //Check if data is correct
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(`${error.details[0].message}`);

    //Checking is user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.send({any: 'Email already exists'});

    //HASH passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user if everything is fine
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    res.send({any: 'Account creation successfull!'});
    try {
        const savedUser = await user.save();
        res.json({user: user._id});
    }catch(err){
        res.status(400).json(err);
    }
});

//Login
auth.post('/login', async (req,res) => {

    //Check if valid details are entered
    const {error} = loginValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //Check if email matches
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.send({any: 'Email is not found'});

    //Check if password matches
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.send({any: 'Invalid password'});

    //If everything is good create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.send({any: 'Login successful!', token: token})
    //res.header('auth-token', token).send(token);
});

auth.patch('/login', async(req,res) =>{

    //Check if email matches
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.send({any: 'Email is not found'});

    //Check if password matches
    const validPass = await bcrypt.compare(req.body.oldpassword, user.password);
    if(!validPass) return res.send({any: 'Invalid password'});

    //HASH passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

    //If everything is good update password
    const updatedUser = await User.updateOne({email: req.body.email}, {$set: {password: hashedPassword}})
    res.send({any: 'Password successfully changed!'});
    try {
        const updatedUser = await user.save();
        //res.json({user: user._id});
    }catch(err){
        res.status(400).json(err);
    }

})

module.exports = auth;