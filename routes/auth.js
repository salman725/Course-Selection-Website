const auth = require('express').Router();
const User = require('../models/User');

auth.post('/register', async (req,res) => {
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