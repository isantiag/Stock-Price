require('dotenv').config() // configure environment variables
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let app = express()
// const axios = require('axios')
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn.js')
const API_KEY = process.env.API_KEY
// var Chart = require('chart.js');
// const db = require('./models/index.js')
// const user = require('./models/user.js')
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
// bring watchlist to controllers
app.use('/watchlist', require('./controllers/watchlist'))
// bring notes to controllers
app.use('/notes', require('./controllers/notes'))
// bring symbols to controllers
app.use('/symbols', require('./controllers/symbols'))
// bring plots to controllers
app.use('/plots', require('./controllers/plots'))
// bring companies to controllers
app.use('/companies', require('./controllers/companies'))


// GET / - Homepage
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

app.get('*',(req,res)=>{
    res.render('main/404')
})
  

app.listen(process.env.PORT, () => {
    console.log(`auth app runnin on port ${process.env.PORT}`)
})



