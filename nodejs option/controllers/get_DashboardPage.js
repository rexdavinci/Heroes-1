const path= require('path')
const fs = require('fs')
const session = path.join('model', 'session.json')
const {errorPage} = require('./get_ErrorPage')
let authenticatedUser = {}

const isLoggedIn = ()=>{
  fs.readFile(session, 'utf8', (err, data)=>{
    if(err)throw err
    let user = JSON.parse(data)
    authenticatedUser = {fullname: user["user"]["fullname"], username: user["user"]["username"]}
  })
}

exports.getDashboardPage = (req, res)=>{
  res.writeHead(200, {"Content-Type": "text/html"})  
  isLoggedIn()
  setTimeout(() => {
    if(typeof authenticatedUser.username === 'undefined'){
      errorPage(req, res, 401)
    } else{
      (authenticatedUser.username !== "" && authenticatedUser.password !== "") ? res.end(`
      <html>
        <head>
          <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
          <title>DashBoard</title>
        </head>
        <body>
          <h1>Welcome, ${authenticatedUser.fullname}</h1>
          <a href="/signout">signout</a>
        </body>
      </html>`) : errorPage(req, res, 403)
    }
  }, 2500);
}
