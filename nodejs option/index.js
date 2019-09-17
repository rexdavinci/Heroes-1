const http = require('http')
const fs = require('fs')
const PORT = 8000 || process.env.PORT
const {router}= require('./router/index')

let authenticatedUser

const createDB = ()=>{
  fs.mkdir('./model', (err)=>{
    if(fs.existsSync()) console.log('direcotry exists')
    else if(err) return
    fs.writeFile('./model/users.json', '{"users":[]}', err=>{
      if(err) throw err
    })
    fs.writeFile('./model/session.json', '{"user":""}', err=>{
      if(err) throw err
    })
  })
}


http.createServer(router).listen(PORT, createDB)