// configure environment variables
require('dotenv').config()
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
// let db = require('./models')
let app = express()
const axios = require('axios')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn.js')
const API_KEY = process.env.API_KEY
var Chart = require('chart.js');
const db = require('./models/index.js')
const user = require('./models/user.js')
const methodOverride = require("method-override")


// enable to have differents files to create the html file - layout
app.set('view engine', 'ejs')
// Enable to grab the form content
app.use(express.urlencoded({ extended: false }))
// session midlleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware
app.use(flash())

// CUSTOM MIDDLEWARE
app.use((req,res,next)=>{
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() // move on to next piece of middleware
})


// enable layout
app.use(ejsLayouts)
// use the files from public folder - css/JS
app.use(express.static(__dirname + '/public/'))
// method-override middleware
app.use(methodOverride("_method"))

// bring auth to controllers
app.use('/auth', require('./controllers/auth'))


// GET / - display all articles and their authors
app.get('/', (req, res) => {
    // if(req.user){
    //     res.send(`req.user: ${req.user.name}`)
    // } else {
    //     res.send("no user currently logged in")
    // }
   res.render('main/home')
})
//     axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`)
//     .then(response => {
//         let obj = response.data['Time Series (5min)']
//         let items = obj['Time Series (5min)']
//         let item
//         let data ={}
//         let list = []
//         let dt
//         let t
        
        
//         for (item in items){
        
//             // console.log(item)
//             // console.log(items[item][1. close])
            
//             t = item.substr(11,18)
//             dt = item.substr(0,10)
            
//             const countSeconds = (str) => {
//                 const [hh = '0', mm = '0', ss = '0'] = (str || '0:0:0').split(':');
//                 const hour = parseInt(hh, 10) || 0;
//                 const minute = parseInt(mm, 10) || 0;
//                 const second = parseInt(ss, 10) || 0;
//                 return (hour*3600) + (minute*60) + (second);
//              };
            
//             // console.log(countSeconds(t))
//             // console.log(dt)
//             data.x = countSeconds(t),
//             data.y = items[item]['4. close']
//             list.push(data)
//             // console.log(list)

//             // return {time:countSeconds(t),open:parseFloat(items[item]['1. open']),high:parseFloat(items[item]['2. high']),low:parseFloat(items[item]['3. low']),close:parseFloat(items[item]['4. close'])}

//         }
//         console.log(list)
//         res.render('main/home',{data:data})
       
//         });
     
//     })

  

app.get('/profile',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        db.symbol.findAll().then(symbols =>{
            res.render('main/profile',{user,symbols})
        })
    })
})

app.get('/watchlist',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        res.render('watchlist/index',{user:user})     
    })
})

app.get('/watchlist/new',isLoggedIn, (req, res) => {
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


app.post('/watchlist',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email}
    })
    .then(user =>{
        db.symbol.findOne({
            where:{id:req.body.symbol}
        })
        .then(symbol =>{
            console.log(symbol.id)
            user.addSymbol(symbol).then({             
            })
        })
        res.redirect('/watchlist')  
    })
     
})  

app.delete('/watchlist/:id',isLoggedIn, (req,res)=>{
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

app.get('/notes',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include : [db.note]
    })
    .then(user =>{
        res.render('notes/index',{user})
    })
})

app.get('/notes/edit/:id',isLoggedIn, (req, res) => {
    db.note.findOne({
        where:{id:req.params.id}
    })
    .then(note =>{
        res.render('notes/edit',{note})
    })
})

// To edit a specific note
app.put("/notes/:id",isLoggedIn, (req,res)=>{
    db.note.update({
      title: req.body.title,
      content: req.body.content},
      {
        where: {id: req.params.id}
    }).then(noteChanged =>{
      res.redirect('/notes')
  })
  })


app.post('/notes',isLoggedIn, (req, res) => {
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

app.delete('/notes/:id',isLoggedIn, (req,res)=>{
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

app.get('/symbols',isLoggedIn, (req, res) => {
    db.symbol.findAll().then(symbols =>{
        res.render('symbols/index',{symbols})
    })

})

app.get('/symbols/new',isLoggedIn, (req, res) => {
        res.render('symbols/new')
})

app.get('/symbols/edit/:id',isLoggedIn, (req, res) => {
    db.symbol.findOne({
        where:{id:req.params.id}
    })
    .then(symbol =>{
        res.render('symbols/edit',{symbol})
    })
})

// To edit a specific symbol
app.put("/symbols/:id",isLoggedIn, (req,res)=>{
    db.symbol.update({
      symbol: req.body.symbol,
      name: req.body.name},
      {
        where: {id: req.params.id}
    }).then(symbolChanged =>{
        res.redirect('/symbols')
  })
  })

app.delete('/symbols/:id',isLoggedIn, (req,res)=>{
    db.symbol.destroy({
        where:{id:req.params.id}
    })
    .then(rowdeleted =>{
        res.redirect('/symbols')
    })
})

app.post('/symbols',isLoggedIn, (req, res) => {
    console.log(req.body.symbol)
    db.symbol.findOrCreate({
        where:{symbol:req.body.symbol,
                name: req.body.name}
    })
    .then(([user, wasCreated]) =>{
        res.redirect('/symbols')
     })
})


app.get('/plots/view',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        res.render('plots/index',{user})
    })
})

app.get('/companies',isLoggedIn, (req, res) => {
    db.user.findOne({
        where:{email:req.user.email},
        include: [db.symbol]
    })
    .then(user =>{
        res.render('companies/index',{user})
    })
})

app.get('*',(req,res)=>{
    res.render('main/404')
})
  

app.listen(process.env.PORT, () => {
    console.log(`auth app runnin on port ${process.env.PORT}`)
})



