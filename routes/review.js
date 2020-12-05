const rvw = require('express').Router();
const verify = require('./verifyToken');

rvw.get('/', verify, (req,res) => {
    res.json({
        review: {
            title: 'great course',
            description: 'only logged in users can view this review'
        }
    });
});

rvw.post('/', verify, (req,res) => {
    res.json({
        review: {
            title: 'great course',
            description: 'only logged in users can view this review'
        }
    });
});


module.exports = rvw;