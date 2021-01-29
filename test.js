// const bcrypt = require('bcrypt')
// const saltRounds = 10;
// const myPlaintextPassword = 'Password';

// const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

// console.log(hash)

//Reading the file using default 
//fs npm package  
const fs = require("fs");
const db = require('./models/index.js') 
// csv = fs.readFileSync("earnings.csv") 
  
// // Convert the data to String and 
// // split it in an array 
// var array = csv.toString().split("\r"); 
  
// // All the rows of the CSV will be  
// // converted to JSON objects which  
// // will be added to result in an array 
// let result = []; 
  
// // The array[0] contains all the  
// // header columns so we store them  
// // in headers array 
// let headers = array[0].split(", ") 
  
// // Since headers are separated, we  
// // need to traverse remaining n-1 rows.  
// for (let i = 1; i < array.length - 1; i++) { 
//   let obj = {} 
  
//   // Create an empty object to later add  
//   // values of the current row to it 
//   // Declare string str as current array 
//   // value to change the delimiter and  
//   // store the generated string in a new 
//   // string s 
//   let str = array[i] 
//   let s = ''
  
//   // By Default, we get the comma seprated 
//   // values of a cell in quotes " " so we  
//   // use flag to keep track of quotes and  
//   // split the string accordingly 
//   // If we encounter opening quote (")  
//   // then we keep commas as it is otherwise 
//   // we replace them with pipe | 
//   // We keep adding the characters we  
//   // traverse to a String s 
//   let flag = 0 
//   for (let ch of str) { 
//     if (ch === '"' && flag === 0) { 
//       flag = 1 
//     } 
//     else if (ch === '"' && flag == 1) flag = 0 
//     if (ch === ', ' && flag === 0) ch = '|'
//     if (ch !== '"') s += ch 
//   } 
  
//   // Split the string using pipe delimiter |  
//   // and store the values in a properties array 
//   let properties = s.split("|") 
  
//   // For each header, if the value contains 
//   // multiple comma separated data, then we 
//   // store it in the form of array otherwise 
//   // directly the value is stored 
//   for (let j in headers) { 
//     if (properties[j].includes(", ")) { 
//       obj[headers[j]] = properties[j] 
//         .split(", ").map(item => item.trim()) 
//     } 
//     else obj[headers[j]] = properties[j] 
//   } 
  
//   // Add the generated object to our 
//   // result array  
//   result.push(obj) 
// } 
  
// // Convert the resultant array to json and  
// // generate the JSON output file. 
// let json = JSON.stringify(result); 
// fs.writeFileSync('output.json', json); 

// console.log(result)
// let sub =[]
// let sr

// sr = result[0].split(",")
  

// console.log()

let new_res=[]

let rawdata = fs.readFileSync('output1.json');
let student = JSON.parse(rawdata);
console.log(student[0].symbol_name.split(','));

// new_res.symbol[0][0] = student[0].symbol_name.split(',')[0],
// new_res.name[0][1]= student[0].symbol_name.split(',')[1]

for  (let i=0; i<student.length;i++){
  new_res.push({
    a: student[i].symbol_name.split(',')[0],
    b: student[i].symbol_name.split(',')[1]
  })
}

console.log(new_res.length)
console.log(new_res[0].a)
console.log(new_res[0].b)
console.log(student.length)




for (let i=0;i<new_res.length;i++){
  db.symbol.create({
    symbol: new_res[i].a,
    name: new_res[i].b
  })
}

// require('dotenv').config()
// let express = require('express')
// let app = express()
// const db = require('./models')
// const axios = require('axios')
// const API_KEY = process.env.API_KEY

// TIME_SERIES_INTRADAY 

// Time interval between two consecutive data points in the time series. The following values are supported: 1min, 5min, 15min, 30min, 60min



// app.get('/', (req, res) => {
//   axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`)
//   .then(response => {
//     res.send(response)
//       // res.send(response.data)
//   })
// })

// function toTimestamp(strDate){
//   var datum = Date.parse(strDate);
//   return datum/1000;
//  }

//  let value = toTimestamp("2021-01-26 20:00:00")
//  console.log(value)




 

//  <% let ctx = document.getElementById("myChart").getContext('2d') %> 

// <!-- <% let myChart = new Chart(ctx, { %>
//                     <%  type: 'line', %>
//                     <%  data: {        %>
//                             <%  labels: objs.labels, %>
//                             <%  datasets: [{ %>
//                             <%      label: 'Close Price', %>
//                             <%      data: objs.data }] %>
//                             <%   }      %> 
//              <%   }) %> -->

      




// <!-- <div id="plots"></div> -->

// <!-- <% objs%> -->

// <!-- <script>
//     console.log('We are here')

//     function createCanvas(){
//         let elCanvas
//         for (let i=1; i<= mySymbols.length; i++){
//             elCanvas = document.createElement('canvas')
//             elCanvas.setAttribute("id",`myChart${i}`)
//             const plotsDiv = document.querySelector("#plots");
//             plotsDiv.append(elCanvas);
//         }
//     }
    
//     createCanvas()
    

//     function createPlots(){
//         for (let i=1; i<= mySymbols.length; i++){
//             let `ctx${i}` = document.getElementById(`myChart+${i}`).getContext('2d')
//             for (obj in objs){
//             let `myBarChart${i}` = new Chart(`ctx${i}`, {
//                 type: 'line',
//                 data: {
//                         labels: objs.labels,
//                         datasets: [{
//                             label: 'Close Price',
//                             data: objs.data }]
//                         }       
//                 })

//         }
//     }

//     createPlots()




//     function toTimestamp(strDate){
//         var datum = Date.parse(strDate);
//         return datum/1000;
//        }
      
//     // t = toTimestamp(item)





//     let mySymbols=[]
//         let data = []
//         let labels =[]
//         let items
//         let t
//         let objs = {}
//         if (user.symbols.length>0){   
//             console.log('user.symbols greather than 0')
//             user.symbols.forEach(symbol =>{
//                 console.log(symbol)
//                 mySymbols.push(symbol.symbol)
//                 axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol.symbol}&interval=5min&apikey=${API_KEY}`)
//                 .then(response => {
//                     items = response.data['Time Series (5min)']
//                     // console.log('This is the list of items......')
//                     // console.log(items)
                    
//                     for (let item in items){

//                         t = item.substr(11,18)

//                         labels.push(t)
//                         // data.open = items[item]['1. open']
//                         // data.high = items[item]['2. high']
//                         // data.low = items[item]['3. low']
//                         data.push(parseFloat(items[item]['4. close']))

//                     }
//                     // console.log(objs)
//                     // console.log(labels)
//                     objs.data = data
//                     objs.labels = labels
//                     // mySymbols.push(symbol)
//                     // listObj.push(obj)
//                     // console.log(objs)
//                 })
//             })
//             setTimeout(function() {
//                 console.log('Object')
//                 // console.log(objs)
//                 res.render('plots/index',{objs,mySymbols})
//             }, 5000);
 


//             async function createChart(){
//                 await getData()
//                 await createElement()
//                 <% if (lstSymbol.length>0){ %>
//                     <% lstSymbol.forEach(await symbol=>{%>
//                         const `domElement${j}` = document.getElementById(`myChart${j}`)
//                         const `chart${j}` = LightweightCharts.createChart(`domElement${j}`,{width:1500,height:600})
//                         const `candleSeries${j}` = `chart${j}`.addCandlestickSeries()
            
//                         for (let item in newArray[j]){
//                                     t = item.substr(11,18)
//                                     data.time = countSeconds(t)
//                                     data.open = parseFloat(items[item]['1. open'])
//                                     data.high = parseFloat(items[item]['2. high'])
//                                     data.low = parseFloat(items[item]['3. low'])
//                                     data.close= parseFloat(items[item]['4. close'])
//                         }
//                         `candleSeries${j}`.setData(data)
//                     <%})%>
//                 <%}%>
//             }

           


    
    
  
    
    
    
    
    
    
    
    
    
   






