const express = require("express");
const router = express.Router();
const authentication = require('../middlewere/authentication')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')

//route               GET api/auth
//discription         test route
//ascess given        public

router.get("/",authentication, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.send(user)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')

    }

})

//route               POST api/users
//discription         authenticate the user and get the token
//ascess given        public

router.post('/', [
    check('email', 'please enter a valid email address').isEmail(),
    check('password', 'please enter a password of 6 or more characters').exists()
],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            // see if user already exist
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] })
            }

            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({errors:[{msg: 'invalid credentials'}]})
            }



            // return the jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err
                res.json({ token })
            })
            // res.send('user registered')

            // console.log(req.body)
            // res.send('user route is connected')

        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')

        }



    })

module.exports = router;
