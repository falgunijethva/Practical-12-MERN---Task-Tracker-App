const mongoose = require("mongoose")

const taskSchema =  mongoose.Schema({
    text:String,
    day:String,
    reminder:Boolean
})

const taskModel = mongoose.model("task",taskSchema,"task")

module.exports=taskModel