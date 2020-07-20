const express = require ('express');
const connectingtodb = require('./config/connectdb') 

const app=express()

//connecting to the database heere
connectingtodb()

app.get('/',(req,res)=>res.send('API is running'))

const PORT = process.env.PORT || 2222

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))