const mongoose=require('mongoose')
const catagorySchema=mongoose.schema({

    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isActive:Boolean
})
catagorySchema.virtual('product'{
    ref:'Product',
    localField:'_id',
    foreignField:'catagoryId'
})
catagorySchema.virtual('expensive'{
    ref:'Product',
    localField:'_id',
    foreignField:'catagoryId'
    option:{sort:{price:-1},limits:5}}
})
catagorySchema.set('toObjects',{virtuals:true})
catagorySchema.set('toJSON',{virtuals:true})
module.exports=Catagory=mongoose.model('Catagory',catagorySchema);
