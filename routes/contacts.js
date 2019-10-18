const express = require('express');
const router = express.Router(); //After calling this, we no longer use app.post or app.get but start with router. 
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    get api/contacts
//@desc     get users contacts
//@access   Private because you have to be logged in. 
router.get('/', auth, async (req, res) => { //Auth will always be needed if it needs to be private
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' })
    }
});

//@route    POST api/contacts
//@desc     Adding contacts
//@access   Private because you have to be logged in. 

router.post('/',
    [
        auth,
        [check('name', 'Name is required').not().isEmpty()]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, type } = req.body;
        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            const contact = await newContact.save();
            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: "Server Error." })
        }
    });

//@route    PUT api/contacts/:id This is more specific in regarsd to the contact that we want to update. 
//@desc     Updating contacts
//@access   Private because you have to be logged in. 
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //To build a contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id); //This is us trying to access the /:id parameter 
        if (!contact) res.status(404).json({ msg: "Not Found" });
        //Make sure the user owns the contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' })
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

        res.json(contact);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error." });
    }
});

//@route    DELETE api/contacts/:id This is more specific in regarsd to the contact that we want to update. 
//@desc     Deleting contacts
//@access   Private because you have to be logged in. 
router.delete('/:id', auth, async (req, res) => {

    try {
        let contact = await Contact.findById(req.body.id);
        if (!contact) res.status(404).json({ msg: "Contact not found" });
        if (contact.user !== req.user.id) res.status(401).json({ msg: "Unauthorized" });

        await Contact.findByIdAndRemove(req.params.id);

        json({ msg: "contact deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server Error." });
    }

});




module.exports = router;


