const express = require('express');

require('dotenv').config();
require('./Models/db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');


const PORT = process.env.PORT || 3000;


app.get('/ping', (req, res) => { 
    res.send('Backend Server response');
})

app.use(bodyParser.json());
app.use(cors());

app.options('*', cors());

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});