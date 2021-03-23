let express = require('express')
const db = require('../models')
let router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn.js')

router.get('/view',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        res.render('plots/index',{user})
    })
})

module.exports = router