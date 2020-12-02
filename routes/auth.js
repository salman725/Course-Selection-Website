const auth = require('express').Router();

auth.post('/register', (req,res) =>{
    res.send('Register');
})

module.exports = auth;