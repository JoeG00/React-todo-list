const mongoose = require("../database");

const mongoose1 = require('mongoose')
const {Schema} =mongoose;

const TaskSchema= new Schema(
    {
        title: {type:String, required:true },
        description:{type:String, required:true}
    }
)

//Task is how to refer to your data and TaskSchema how it is formatted in DB
module.exports=mongoose1.model('Task', TaskSchema);
