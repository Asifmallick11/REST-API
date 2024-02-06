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

module.exports = router