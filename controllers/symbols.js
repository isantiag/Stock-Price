let express = require('express')
const db = require('../models')
let router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn.js')

router.get('/',isLoggedIn, (req, res) => {
    db.symbol.findAll().then(symbols =>{
        res.render('symbols/index',{symbols})
    })

})

router.get('/new',isLoggedIn, (req, res) => {
        res.render('symbols/new')
})

router.get('/edit/:id',isLoggedIn, (req, res) => {
    db.symbol.findOne({
        where:{id:req.params.id}
    })
    .then(symbol =>{
        res.render('symbols/edit',{symbol})
    })
})

// To edit a specific symbol
router.put("/:id",isLoggedIn, (req,res)=>{
    db.symbol.update({
      symbol: req.body.symbol,
      name: req.body.name},
      {
        where: {id: req.params.id}
    }).then(symbolChanged =>{
        res.redirect('/symbols')
  })
  })

router.delete('/:id',isLoggedIn, (req,res)=>{
    db.symbol.destroy({
        where:{id:req.params.id}
    })
    .then(rowdeleted =>{
        res.redirect('/symbols')
    })
})

router.post('/',isLoggedIn, (req, res) => {
    console.log(req.body.symbol)
    db.symbol.findOrCreate({
        where:{symbol:req.body.symbol,
                name: req.body.name}
    })
    .then(([user, wasCreated]) =>{
        res.redirect('/symbols')
     })
})

module.exports = router