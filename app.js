const express = require('express');
const { parse } = require('path');
const app = express();
const port = 3000;
const router = express.Router();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');

app.use(express.json());

//Courses
const courses = require('./Lab3-timetable-data.json');
const scheduleArray = [];

dotenv.config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
  });

//Setup serving front-end code

app.use('/', express.static('static'));

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/reviews', reviewRoute);

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    ()=> console.log('Connected to db!')
);

router.get('/', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(courses);
});

app.get('/api/schedule', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(scheduleArray);
});

// Parse data in body as JSON
//router.use(express.json());

// Subject name (ex: STATS)
router.get('/:subject', (req, res) => {
    const subject = req.params.subject;
    console.log(`GET request for ${req.url}`);
    const coursesArray = [];
    for (i=0; i<courses.length; i++){
        if(courses[i]["subject"] == subject){
        coursesArray.push(courses[i]);
    }
}
    if(coursesArray.length > 0){
        res.send(coursesArray);
    }
    else {
        res.status(404).send(`Course ${subject} was not found!`)
    }
});

// Subject name and catalog number (ex. STATS 1023A)
router.get('/:subject/:catalog_nbr', (req, res) => {
    const subject = req.params.subject;
    const catalogNbr = req.params["catalog_nbr"];
    console.log(`GET request for ${req.url}`);
    const coursesArray1 = [];
    for (i=0; i<courses.length; i++){
        if(courses[i]["subject"] == subject && courses[i]["catalog_nbr"] == catalogNbr){
        coursesArray1.push(courses[i]);
    }
}
    if(coursesArray1.length > 0){
        res.send(coursesArray1);
    }
    else {
        res.status(404).send(`Course ${subject} ${catalogNbr} was not found!`)
    }
});

// Subject name, catalog number and course component (ex. STATS 1023A LAB)
router.get('/:subject/:catalog_nbr/:ssr_component', (req, res) => {
    const subject = req.params.subject;
    const catalogNbr = req.params["catalog_nbr"];
    const courseComponent = req.params.ssr_component;
    console.log(`GET request for ${req.url}`);
    const coursesArray2 = [];
    for (i=0; i<courses.length; i++){
        if(courses[i]["subject"] == subject && courses[i]["catalog_nbr"] == catalogNbr && courses[i]["course_info"][0]["ssr_component"] == courseComponent){
        coursesArray2.push(courses[i]);
    }
}
    if(coursesArray2.length > 0){
        res.send(coursesArray2);
    }
    else {
        res.status(404).send(`Course ${subject} ${catalogNbr} ${courseComponent} was not found!`)
    }
});

// Install the router at /api/courses
app.use('/api/courses', router);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

