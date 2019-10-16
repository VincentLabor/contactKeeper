const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require('../models/User');

//@route    POST  api/auth
//@desc     Get logged in user
//@access   private because getting a logged in user.

router.get('/', (req, res) => { //The / acts a default because from server, it will be redirected here
    res.send('Get logged in user')
});


//@route    POST  api/auth
//@desc     Auth user and get token
//@access   private because getting a logged in user.

router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);//This is only for routes that need validation or data
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //Will give an error if something is missing or not right. 
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" })
            }

            const isMatch = await bcrypt.compare(password, user.password); //await because this returns a promise.
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" })
            }

            //If the credentials are matching, we begin the process of tokenization.
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: "Server Error" });
        }
    });

module.exports = router;