const fs = require('fs')
console.log(process.argv)

fs.writeFile(process.argv[2],process.argv[3],(err,suc)=>{
    if(err) throw err
    console.log(suc)
})