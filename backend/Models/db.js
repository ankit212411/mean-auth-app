const mongoose = require('mongoose');

const mongo_url = process.env.MONGODB_URL;

mongoose.connect(mongo_url)
    .then(() => {
    console.log('Connected to MongoDB');
    }).catch((err) => {
        consol.log('Error connecting to MongoDB', err);
})