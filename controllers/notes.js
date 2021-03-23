let express = require('express')
const db = require('../models')
let router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn.js')

// Get the list of notes
router.get('/',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include : [db.note]
    })
    .then(user =>{
        res.render('notes/index',{user})
    })
})

// Form to edit a specific note
router.get('/edit/:id',isLoggedIn, (req, res) => {
    db.note.findOne({
        where:{id:req.params.id}
    })
    .then(note =>{
        res.render('notes/edit',{note})
    })
})

// Update the edited note in the database
router.put("/:id",isLoggedIn, (req,res)=>{
    db.note.update({
      title: req.body.title,
      content: req.body.content},
      {
        where: {id: req.params.id}
    }).then(noteChanged =>{
      res.redirect('/notes')
  })
  })

// Add a new note
router.post('/',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include : [db.note]
    })
    .then(user =>{
        user.createNote({
            title:req.body.title,
            content:req.body.content
        })
        .then(note =>{
            res.redirect('/notes')
        })
        
    })
})

// Delete a specific note
router.delete('/:id',isLoggedIn, (req,res)=>{
    db.user.findOne({
        where:{email:req.user.email},
        include : [db.note]
    })
    .then(user =>{
        db.note.findOne({
            where:{id:req.params.id}
        })
    .then(note =>{
        user.removeNote(note).then(()=>{
            res.redirect('/notes')
        })
    })
  })
})



 module.exports = router