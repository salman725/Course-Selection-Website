const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    courseList: [{subject: String, catalog_nbr: String}],
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);