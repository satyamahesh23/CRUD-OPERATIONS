const express=require("express")
const router=express.Router()

const Product = require("../models/Products")

// get route

router.get("/",async (req,res) => {
    try {
        const product=await Product.find()
        res.status(200).json({success:true,count:product.length,data:product})
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
    
})

router.get("/:id",async (req,res) => {
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(201).json({success:true,data:product})

    } catch (err) {
         res.status(500).json({ success: false, message: err.message });
        
    }
    
})

// post create new product

router.post("/",async (req,res) => {
    try {
        const product=await Product.create(req.body)
        res.status(201).json({
            message:true,
            data:product
        })
    } catch (error) {
        res.status(400).json({message:false})
        
    }
    
})

// put-update the product

router.put("/:id",async (req,res) => {
    try {
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
            
        })
     
        if(!product){
            res.status(404).json({success:false})
             return
             
        }
         
        res.status(201).json({success:true,data:product})
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
    
})

// delete the product

router.delete("/:id",async (req,res) => {
    try {
        const product=await Product.findByIdAndDelete(req.params.id)
      
    
        if(!product){
            res.status(404).json({success:false}) 
             return
             
        }
        
        res.status(201).json({success:true,message:product})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
    
})

module.exports=router