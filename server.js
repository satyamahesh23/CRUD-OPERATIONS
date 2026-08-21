const express = require('express');
require("dotenv").config()
const app = express()
const cors=require('cors')
const mongoose=require("mongoose")

const productRoutes=require("./routes/products")

app.use(cors())
app.use(express.json())

app.use('/api/products',productRoutes)

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