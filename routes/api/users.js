const express = require('express')
const router = express.Router()
const {check,validationResult} = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../../models/Users')


//route               POST api/users
//discription         registration of user
//ascess given        public

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','please enter a valid email address').isEmail(),
    check('password','please enter a password of 6 or more characters').isLength({min:6})
],
async (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, password} = req.body

    try {
        // see if user already exist
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({errors:[{msg:'user already exists'}]})
        }
        
        // use the gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        // encrypt the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()

        // return the jsonwebtoken
        res.send('user registered')

        console.log(req.body)
        res.send('user route is connected')
        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }

    

})

module.exports=router







//req.body=>its the object in which the the data is send to that route