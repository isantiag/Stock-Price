let express = require('express')
const db = require('../models')
let router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn.js')

// Get the watchlist
router.get('/',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        res.render('watchlist/index',{user:user})     
    })
})

// Form with the list of symbol
router.get('/new',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        db.symbol.findAll().then(symbols =>{
            res.render('watchlist/new',{user,symbols})
        })
    })
})

// Add new symbol to the watchlist
router.post('/',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email}
    })
    .then(user =>{
        db.symbol.findOne({
            where:{id:req.body.symbol}
        })
        .then(symbol =>{
            user.addSymbol(symbol).then({             
            })
        })
        res.redirect('/watchlist')  
    })
     
})  

// Delete a symbol from the watchlist
router.delete('/:id',isLoggedIn, (req,res)=>{
    db.user.findOne({
        where:{email:req.user.email},
        include : [db.symbol]
    })
    .then(user =>{
        db.symbol.findOne({
            where:{id:req.params.id}
        })
    .then(symbol =>{
        user.removeSymbol(symbol).then(()=>{
            res.redirect('/watchlist')
        })
    })
  })
})

module.exports = router