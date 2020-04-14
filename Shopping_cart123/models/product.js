const mongooose=require('mongoose')
const productSchema=mongoose.Schema({
    catagoryId:
    {
        type:mongoose.Schema.Types.objectId,
        ref:'Catagory',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        defalut:Date.now
    },
    price:{
        type:Number,
        required:true
    },
    isActive:Boolean
})
module.exports=mongoose.model('Product',productSchema);