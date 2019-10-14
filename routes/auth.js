const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 

//@route    POST  api/auth
//@desc     Get logged in user
//@access   private because getting a logged in user.

router.get('/', (req, res) => { //The / acts a default because from server, it will be redirected here
    res.send('Get logged in user')
});


//@route    POST  api/auth
//@desc     Auth user and get token
//@access   private because getting a logged in user.

router.post('/', (req, res) => {
    res.send('Log in user')
});

module.exports = router;