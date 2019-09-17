const fs = require('fs')
const path= require('path')
const session = path.join('model', 'session.json')
// const PORT = 8000

exports.postSignout=(req, res)=>{
  setTimeout(() => {
    res.writeHead(200, {"Content-Type": "text/html"})
    fs.readFile(session, 'utf8', (err, data)=>{
      if(err) throw err
      console.log(JSON.parse(data))
      fs.unlink(session, err=>{
        if(err) throw err
        // res.end()
        console.log('signed out')
        res.end()
      })
    })
  }, 5000);
}