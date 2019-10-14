const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 
const User = require('../models/User');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


//@route    POST  api/users
//@desc     Register a user
//@access   Public because this is to register to become a user. 

router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
 async (req, res) => {
    const errors = validationResult(req);//This is only for routes that need validation or data
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //Will give an error if something is missing or not right. 
    }
    
    const {name,email,password} = req.body; //req.body should now have the name, email, and password.

    try {
        let user = await User.findOne({email}); //findOne is a mongoose command. the parameter is actually email:email but ES6 says we can just put it once. 
        if (user){
            res.status(400).json({msg: "user already exists"})
        }

        user = new User(
            name,
            email,
            password
        ); //Need to encrypt the password before we save to the database.

        const salt = bcrypt.genSalt(10);
        user.password = bcrypt.hash(password,salt); 

        await user.save();
        res.send('User saved');
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error'); //500 is a server error
    }

});

module.exports = router;