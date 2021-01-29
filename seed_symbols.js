const fs = require("fs");
const db = require('./models/index.js') 

let new_res=[]

let rawdata = fs.readFileSync('output1.json');
let student = JSON.parse(rawdata);
console.log(student[0].symbol_name.split(','));

for  (let i=0; i<student.length;i++){
    new_res.push({
      a: student[i].symbol_name.split(',')[0],
      b: student[i].symbol_name.split(',')[1]
    })
  }

  for (let i=0;i<new_res.length;i++){
    db.symbol.create({
      symbol: new_res[i].a,
      name: new_res[i].b
    })
  }