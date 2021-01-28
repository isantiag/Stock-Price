let express = require('express')
const db = require('../models')
let router = express.Router()
const passport = require('../config/ppConfig.js')


router.get('/signup', (req, res) => {
    res.render("auth/signup.ejs")
})

router.post('/signup', (req, res) => {
    console.log(req.body)
    db.user.findOrCreate({
        where: {
            email:req.body.email
        },
        defaults:{
            name: req.body.name,
            password: req.body.password
        }
    }).then(([user,wasCreated])=>{
        if(wasCreated){
            passport.authenticate('local',{
                successRedirect:'/',
                successFlash:'Account created and user logged in!'
            })(req,res) //IIFE
            // res.send(`Created a new user profile for ${user.email}`)
        }else{
            req.flash('error','An account associate with that email address already exists!Did you mean to log in')
            res.redirect('/auth/login')
        }        
    })
    .catch(err =>{
        req.flash('error',err.message)
        res.redirect('/auth/signup')
    })
})

router.post('/login', passport.authenticate('local',{
    failureRedirect: '/auth/login',
    successRedirect: '/profile',
    successFlash: 'You are now logged in :)',
    failureFlash: 'Invalid email or password :('
}))



router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router