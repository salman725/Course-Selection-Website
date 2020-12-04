const schd = require('express').Router();
const Schedule = require('../models/Schedule');

// Gets back all the schedules
schd.get('/', async (req, res) => {
    try{
        const schedule = await Schedule.find();
        res.json(schedule);
    }catch(err){
        res.json({message:err});
    }
});

// Submits a schedule
schd.post('/', async (req,res) => {

    //Checking if schedule is already there
    const scheduleExist = await Schedule.findOne({name: req.body.name});
    if (scheduleExist) return res.send({any: 'Schedule already exists'});

    // If not then create a new schedule
    const schedule = new Schedule({
        name: req.body.name,
        username: req.body.username,
        description: req.body.description
    });
    //res.send({any: 'Schedule creation successfull!'});
    try {
        const savedSchedule = await schedule.save();
        res.json(savedSchedule);
    }catch(err){
        res.status(400).json(err);
    }
});

// Adds course/courses to schedule
schd.post('/name', async (req,res) =>{
    Schedule.findOneAndUpdate({name: req.body.name},
        { $set: {date: Date.now()}, $push: {courseList: {subject: req.body.subject, catalog_nbr: req.body.catalog_nbr}}},
        res.send({any: 'Course added successfull!'}),
            function(error, success) {
                if(error){
                    console.log(error)
                }
                else{
                    console.log(success);
                }
            }
        );
});

//Specific Schedule
schd.get('/name', async (req,res)=>{
    const scheduleName = req.body.name;
    await Schedule.find({name: scheduleName}, (error, data) =>{
        if(error){
            console.log(error)
        }else{
            res.json(data);
        }
    })
});

//Delete a schedule
schd.delete('/name', async (req,res)=>{
    try{
    const removedSchedule = await Schedule.deleteOne({name: req.body.name});
    res.json(removedSchedule);
    }catch(err){
        res.json({message: err});
    }
});

//Update Schdule
schd.patch('/name', async (req,res) => {
    const updatedSchedule = await Schedule.updateOne({name: req.body.oldname}, {$set: {name: req.body.newname, description: req.body.description, date: Date.now()}})
    res.send({any: 'Schedule successfully changed!'});
    try {
        const updatedSchedule = await schedule.save();
        //res.json({user: user._id});
    }catch(err){
        res.status(400).json(err);
    }
});

module.exports = schd;