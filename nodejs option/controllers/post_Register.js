const fs = require('fs')
const qs = require('querystring')
const path= require('path')
const db = path.join('model', 'users.json')
const crypto = require('crypto')
const PORT = 8000

// const addUser = (formData, json)=>fs.readFile(db, 'utf8', (err, data)=>{
//   if(err){
//     console.log(err)
//     throw err
//   }
//   let users = JSON.parse(data)
//     console.log(data)
//     users.users.push({id: Math.random(), username: formData.username, password: formData.password, fullname: formData.fullName})
//     fs.writeFile(db, json, err=>{
//       if(err) throw err
//     })
//     console.log(`User ${formData.username} registered successfully`)
// })

const hashPassword = async(password)=>{
  try{
    let mykey = await crypto.createCipher('aes-128-cbc', 'mypassword');
    let mystr = await mykey.update(password, 'utf8', 'hex')
    mystr += mykey.final('hex')
    return mystr
  }catch(err){console.log(err)}
}


exports.postRegister =(req, res)=>{
  res.writeHead(200, {"Content-Type": "text/html"})
  let reqBody = ''
  req.on('data', (data)=>{
    reqBody += data
    reqBody.length > 1e6 ? getError(req, res, 413) : res.writeHead(200, {"Content-Type": "text/html"})
  })
  req.on('end', ()=>{
    const formData = qs.parse(reqBody)
    fs.readFile(db, 'utf8', async (err, data)=>{
      if(err) throw err
      let obj = JSON.parse(data)
      const hashedPw = await hashPassword(formData.password)
      console.log(hashedPw)
      obj.users.push({id: Math.random(), username:formData.username, password:hashedPw, fullname: formData.fullName})
      const json = (JSON.stringify(obj, null, 2))
      fs.writeFile('./model/users.json', json, err=>{
        if(err) throw err
      })
      console.log('User added')
    })
    res.writeHead(301, {
      'Location': `http://localhost:${PORT}/login`
    })
    res.end()
  })
}