const auth = require('express').Router();
const verify = require('./verifyToken');

auth.get('/', verify, (req,res) => {
    res.json({
        review: {
            title: 'great course',
            description: 'only logged in users can view this review'
        }
    });
});

module.exports = auth;