const fs = require('fs')
const url = require('url')
const path = require('path')
const qs = require('querystring')
const db = '../db/users.json'
const {mimeType, hashPassword, decryptPw, locateUser} = require('./helpers')



module.exports = {
  getPages: (req, res)=>{
    console.log(req.method, '-', req.url)
    const parsedUrl = url.parse(req.url)
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, '../', 'frontend', sanitizePath)
    if(!fs.existsSync(pathname)){
      res.writeHead(404)
      res.end('resource not available')
      return;
    }
    else {
      // if is a directory, then look for index.html
      if (fs.statSync(pathname).isDirectory()) {
        pathname += 'index.html';
      }
      // read file from file system
      fs.readFile(pathname, 'utf8', (err, data)=>{
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // console.log(data)
          // based on the URL path, extract the file extention. e.g. .js, .doc, ...
          const ext = path.parse(pathname).ext;
          // if the file is found, set Content-type and send data
          res.writeHead(200, { 'Content-type': mimeType[ext] || 'text/plain' })
          res.end(data)
        }
      })
    }
  },

  login: (req, res) => {
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE', 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'})
    res.writeHead(200, {"Content-Type": "text/html"})
    let reqBody = ''
    req.on('data', (data)=>{
      reqBody += data
      reqBody.length > 1e6 ? errorPage(req, res, 413) : res.writeHead(200, {"Content-Type": "text/html"})
    })
    req.on('end', (data)=>{
      const formData = qs.parse(reqBody)
      console.log(formData)
      locateUser(formData.username, formData.password)
      res.writeHead(301, {
        'Location': `http://localhost:8000/index.html`
      })
      res.end()
    })





    // res.writeHead(301, { 'Content-Type': 'text/html',
    //   'Location': 'http://localhost:8000/home.html'
    // })
    // res.end()
    
    // let user = { 
    //   title: "dashboard",
    //   username: "alabi",
    //   fullname: "babaolowo alabi",
    //   age: 21
    // }
    // console.log(JSON.stringify(user))
    // res.end(JSON.stringify(user))
  },

  register: (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"})
    let reqBody = ''
    req.on('data', (data)=>{
      reqBody += data
      if(reqBody.length > 1e6){
        res.writeHead(413, {"Content-Type": "text/plain"})
        res.end('information overload') 
      } 
    })
    req.on('end', ()=>{
      const newUser = qs.parse(reqBody)
      fs.readFile(db, 'utf8', async(err, data)=>{
        if(err) throw err
        let obj = JSON.parse(data)
        const hashedPw = await hashPassword(newUser.password)
        obj.users.push({id:Math.random(), name:newUser.name, email:newUser.email, password:hashedPw})
        const json = (JSON.stringify(obj, null, 3))
        fs.writeFile(db, json, err=>{
          if(err)throw err
        })
        console.log('user added')
      })
      res.writeHead(301, { 'Content-Type': 'text/html',
        'Location': 'http://localhost:8000/index.html'
      })
      res.end()
    })
  }
}