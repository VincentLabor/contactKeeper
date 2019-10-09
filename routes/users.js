const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 

//@route    POST  api/users
//@desc     Register a user
//@access   Public because this is to register to become a user. 
router.post('/', (req, res) => {
    res.send('Registers users')
});

module.exports = router;