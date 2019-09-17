const qs = require('querystring')
const crypto = require('crypto')
const fs = require('fs')
const path= require('path')
const db = path.join('model', 'users.json')
const {errorPage} = require('./index')
const session = path.join('model', 'session.json')
const PORT = 8000

const decryptPw = async(password)=>{
  try{
    var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(password, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr
  }catch(err){console.log(err)}
}


const findUser = (username, password)=>{
  fs.readFile(db, 'utf8', async(err, data)=>{
    if(err) throw err
    let obj = JSON.parse(data)
    let allUsers = obj["users"]
    let foundUser
    let usersLen = allUsers.length
    for(let user of allUsers){
      if(user["username"] === username){
        let decryptPassword = await decryptPw(user["password"])
        if(decryptPassword === password){
          console.log('found user')
          console.log(user)
          fs.readFile(session, 'utf8', (err, sessionData)=>{
            if(err)throw err
            let obj = JSON.parse(sessionData)
            foundUser = user
            obj.user = user
            let json = JSON.stringify(obj, null, 2)
            fs.writeFile(session, json, err=>{
              if(err) throw err
            })
            console.log('sign in successful')
          })
        } else{
          console.log('password does not match')
        }
      }else{
        if(usersLen === 1 && !foundUser){ 
          console.log('user not found')
        }
      }
      --usersLen
    }
  })
}

exports.postLogin =(req, res)=>{
  res.writeHead(200, {"Content-Type": "text/html"})
  let reqBody = ''
  req.on('data', (data)=>{
    reqBody += data
    reqBody.length > 1e6 ? errorPage(req, res, 413) : res.writeHead(200, {"Content-Type": "text/html"})
  })
  req.on('end', (data)=>{
    const formData = qs.parse(reqBody)
    findUser(formData.username, formData.password)
    res.writeHead(301, {
      'Location': `http://localhost:${PORT}/dashboard`
    })
    res.end()
  })
}