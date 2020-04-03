const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String
    },
    userName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
        }
        ,
       address:{
            type:String
            }
            ,
            number:{
                type:String
                },
       
       postal_code:{
                    type:String
                    },
       country:{
                    type:String
                    },
   
  date:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model('user', userSchema);