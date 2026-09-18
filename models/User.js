const mongoose=require('mongoose')
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim:true

    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        trim:true


    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlenght:[6,'password must be 6 characters']
    }
},
{timestamps:true})

userSchema.pre("save",async function (next)  {
    if(!this.isModified('password')) return 

"Hey Mongoose, right before you save any User to the database, pause for a second and let me run some code first."
        
        


const salt=await bcrypt.genSalt(10)
this.password=await bcrypt.hash(this.password,salt)

    
})

userSchema.methods.comparePassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
    
}
module.exports=mongoose.model('User',userSchema)