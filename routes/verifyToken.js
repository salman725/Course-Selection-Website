const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    //res.send(req.user);
    //user.findbyOne({_id: req.user});
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}