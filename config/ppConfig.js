const passport = require('passport')
const db = require('../models')
const LocalStrategy = require('passport-local')

// --------------------> SERIALIZATION SET UP <---------------------------------------

// tell passport to serialize the user using
// the id by pass it in to the doneCallback
passport.serializeUser((user,doneCallback) =>{
    console.log('serializing the user...')
    doneCallback(null,user.id)
})

// tells passport how to deserialize the user now by looking it up in
// the database based on the id (which was stored in the session)

passport.deserializeUser((id,doneCallback)=>{
    db.user.findByPk(id)
    .then(foundUser=>{
        console.log('deserializing user...')
        doneCallback(null,foundUser)
    })
    .catch(err=>{
        console.log('Error deserializing user')
    })
})

// --------------------> STRATEGY SET UP <---------------------------------------

const findAndLogInUser = (email, password, doneCallback) =>{
    db.user.findOne({where:{email: email}}) // go check for a user in the db with that email
    .then(async foundUser=>{
        let match
        if(foundUser){
            match = await foundUser.validPassword(password)
        }
        if(!foundUser || !match){ // something funky about the user
            console.log('password was NOT validated i.e. match is false')
            return doneCallback(null, false) // send back "false"
        } else { // user was legit
            return doneCallback(null, foundUser) // send the found user object
        }
    })
    .catch(err=>doneCallback(err)) // doneCallback takes two params: error, userToBeLoggedIn
}

const fieldsToCheck = {
    usernameField: 'email',
    passwordField: 'password'
}


// Create an instance of Local Strategy
// --> constructor arg 1:
// an object that indicates how we're going refer to the two fields
// we're checking (for ex. we're using email instead of username)
// --> constructor arg 2:
// a callback that is ready to receive the two fields we're checking
// as well as a doneCallback
const strategy = new LocalStrategy(fieldsToCheck, findAndLogInUser)

passport.use(strategy)

module.exports = passport