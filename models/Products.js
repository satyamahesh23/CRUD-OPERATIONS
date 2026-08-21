const mongoose=require('mongoose')

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'product name is required']
        },
        description:{
            type:String,
            required:[true, "give the description"]

        },
        price:{
            type:Number,
            required:[true,"product price is required"]
        },
        quantity:{
            type:Number,
            required:[true,"give the quantity"]
        }
        
    },
    {timestamps:true}
)
module.exports=mongoose.model('Product',productSchema)