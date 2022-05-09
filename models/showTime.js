const mongoose = require("mongoose")

const showTimeSchema = mongoose.Schema(
    {
        movie:{
            type:String,
            required:true
        },
        roomNumber:{
            type:String,
        },
        city:{
            type:String,
            required:true
        },
        cinema:{
            type:String,
            required:true
        },
        time:{
            type:Date,
            required:true
        },
        seats:{
            type:Array,
            required:true
        }
    }
)


const ShowTime = mongoose.model('ShowTime',showTimeSchema);
module.exports = ShowTime;