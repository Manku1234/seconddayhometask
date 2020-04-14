const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
require.dotnev().config()
const userschema=mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    emali:{
        type:String,
        require:true
    },
    phone_no:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
userschema.pre('save',async function(callback){
const user=this
if(user.isModified(password)){
    user.password= await.bcrypt.hash(user.password,8)
}(callback)
})
const User=mongoose.model('User',userschema)
module.exports=User