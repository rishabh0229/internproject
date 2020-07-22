const express = require ('express');
const connectingtodb = require('./config/connectdb') 

const app=express()

//connecting to the database heere
connectingtodb()

// init middlewere
app.use(express.json({extended:false}))

app.get('/',(req,res)=>res.send('API is running'))

//define the routes

app.use('/api/users',require('./routes/api/users'))
app.use("/api/auth", require("./routes/api/auth"))
// app.use("/api/profile", require("./routes/api/profile"))

const PORT = process.env.PORT || 2222

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))