const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const config = require("config");
const auth = require('../middleware/auth');
const User = require('../models/User');

//@route    GET api/auth
//@desc     Get logged in user
//@access   private because getting a logged in user.

router.get('/', auth , async (req, res) => { //The / acts a default because from server, it will be redirected here. If the user logged in, the user.id will be within the req. 
    try {
        const user = await User.findById(req.user.id).select('-password'); //We search through the file with the schemas to find the matching users. Getting the user through the database
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


//@route    POST  api/auth
//@desc     Auth user and get token
//@access   Public .

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