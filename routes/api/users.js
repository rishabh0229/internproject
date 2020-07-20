const express = require('express')
const router = express.Router()

//route               GET api/users
//discription         test route
//ascess given        public

router.get('/',(req,res)=>res.send('user route is connected'))

module.exports=router