const express = require('express');
require("dotenv").config()
const app = express()
const cors=require('cors')
const mongoose=require("mongoose")
 const cookieParser = require('cookie-parser') 
const authRoutes = require('./routes/auth')

const productRoutes=require("./routes/products")

app.use(cors({origin:'http://localhost:5173',credentials:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/products',productRoutes)
app.use('/api/auth',authRoutes)

app.get('/', (req, res) => {
  res.send("MERN CRUD API is running")
})

const PORT=process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI).
then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("not connected")
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})