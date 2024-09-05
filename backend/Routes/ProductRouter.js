const router = require('express').Router();
const { ensureAuthenticated } = require('../Middlewares/Auth');

router.get('/', ensureAuthenticated, (req, res) => { 
    console.log('------logged in user------------------------', req.user);
    res.status(200).json([
        {
            id: 1,
            name: 'Product 1',
            price: 100
        },
        {
            id: 2,
            name: 'Product 2',
            price: 200
        }
    ])
});

module.exports = router;