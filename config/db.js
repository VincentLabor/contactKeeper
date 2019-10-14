const mongoose = require('mongoose');
const config = require('config')
const db = config.get('mongoURI');

const connectDB = async () => { //Since this is an arrow function, we can put async before it.
    try{
      await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Mongoserver is connected')
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDB;