const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 

//@route    get api/contacts
//@desc     get users contacts
//@access   Private because you have to be logged in. 
router.get('/', (req, res) => {
    res.send('Gets users contacts');
});

//@route    POST api/contacts
//@desc     Adding contacts
//@access   Private because you have to be logged in. 
router.post('/', (req, res) => {
    res.send('Create a new contact');
});

//@route    PUT api/contacts/:id This is more specific in regarsd to the contact that we want to update. 
//@desc     Updating contacts
//@access   Private because you have to be logged in. 
router.put('/:id', (req, res) => {
    res.send('Update a specific contact');
});

//@route    DELETE api/contacts/:id This is more specific in regarsd to the contact that we want to update. 
//@desc     Deleting contacts
//@access   Private because you have to be logged in. 
router.delete('/:id', (req, res) => {
    res.send('Delete a specific contact');
});




module.exports = router;