const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3555

const {connectToMongoDB} = require('./connect')

app.use(express.json())

const userRouter = require('./route/route')
app.use('/api' , userRouter)

connectToMongoDB('mongodb://127.0.0.1:27017/user-data')

app.listen(PORT , () => console.log(`Server Started on port ${PORT}`))