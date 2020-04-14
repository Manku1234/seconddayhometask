const mongooose=require('mongoose')
const orderSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
booking_email:String,
productId:
    {
        type:mongoose.Schema.Types.objectId,
        ref:'Product',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    })
    module.exports=mongoose.model('Order',orderSchema);