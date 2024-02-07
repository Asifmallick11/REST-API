const express  = require('express')
const app = express()
const router = express.Router()
const USER = require('../model/model')

router.get('/get' , async(req , res) => {

    try {
        const userdata = await USER.find()
        res.json(userdata)
    } catch (error) {
        res.status(400).json({message : error.message})
    }

}) 

router.get('/get/:id' , async (req , res) => {

    try {
        const getdata = await USER.find({_id : req.params.id})
        res.send(getdata)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
    
})

router.post('/post' , async(req , res) => {

    const newuser = new USER ({
        first_name : req.body.first_name ,
        last_name : req.body.last_name , 
        email : req.body.email,
        gender : req.body.gender
    })

    try {
        const saveuser = await newuser.save()
        res.status(200).json(saveuser)
        
    } catch (error) {
        res.status(400).json({message : error.message})
    }
    
})

router.patch('/patch/:id' , async(req , res) => {

    const userid = req.params.id 

    const getdata = await USER.findById({_id : userid})

    if(req.body.first_name != null) { 
        getdata.first_name = req.body.first_name
    }  

    if(req.body.last_name != null) {
        getdata.last_name = req.body.last_name
    }  

    if(req.body.email != null) {
        getdata.email = req.body.email
    } 
    
    if(req.body.gender != null) {
        getdata.gender = req.body.gender
    }  

    try {
        const updatedUser = await getdata.save()
        res.json({updatedUser})
        
    } catch (error) {

        res.status(400).json({message : error.message})
        
    }
})

router.delete('/delete/:id' , async(req , res) => {

    try {
        const deletedata = await USER.deleteOne({_id : req.params.id})
        res.status(200).json({message : "success"} )
    } catch (error) {
        res.status(400).json({message : "something went wrong"})
    }
    
})

module.exports = router