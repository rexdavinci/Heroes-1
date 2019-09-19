const {getPages, register, login} = require('./routeController')

exports.router = (req, res)=>{
  if(req.url === '/home.html' && req.method === "POST"){
    register(req, res)
  } else if(req.url === '/login.html' && req.method === "POST"){
    login(req, res)
  }
  getPages(req, res)
}

