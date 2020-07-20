const express=require ('express');

const app=express()

app.get('/',(req,res)=>res.send('API is running'))

const PORT = process.env.PORT || 2222

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))