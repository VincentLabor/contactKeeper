const express = require("express");
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false})); //This allows to accept the body data. 

app.get('/', (req,res) => {
    res.json({msg: "Welcome to the Contact Keeper API"})
});

//Defining routes from routes folder
//All backend routes to start with /api/
//When it calls /api/etc, it will look for a filepath.
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log(`Your server is now online on port ${PORT}`));