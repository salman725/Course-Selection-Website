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
schd.post('/', async (req,res) =>{
    const schedule = new Schedule({
        name: req.body.name,
        usernmae: req.body.username,
        description: req.body.description
    });
    try{
    const savedSchedule = await schedule.save();
    res.json(savedSchedule);
    }catch(err){
        res.json({message: err});
    }
});

// Adds course to schedule
schd.post('/:name', async (req,res) =>{
    //var objFriends = { subject:"fname",catalog_nbr:"lname"};
    const addCourse = Schedule.findOneAndUpdate({name: req.params.name},
        { $push: {courseList: {subject: req.body.subject, catalog_nbr: req.body.catalog_nbr}}},
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
schd.get('/:name', async (req,res)=>{
    const scheduleName = req.params.name;
    await Schedule.find({name: scheduleName}, (error, data) =>{
        if(error){
            console.log(error)
        }else{
            res.json(data);
        }
    })
});

//Delete a schedule
schd.delete('/:name', async (req,res)=>{
    try{
    const removedSchedule = await Schedule.deleteOne({name: req.params.name});
    res.json(removedSchedule);
    }catch(err){
        res.json({message: err});
    }
});

//Update Schdule
schd.patch('/:name', async (req,res) => {
    try{
    const updatedPost = await Schedule.update({name: req.params.name}, 
        {$push: {subject: req.body.subject}});
    res.json(updatedPost);
    }catch(err){
        res.json({message: err});
}
});

module.exports = schd;