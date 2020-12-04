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
    courseList: [{subject: String, catalog_nbr: String}]
})

module.exports = mongoose.model('Schedule', ScheduleSchema);