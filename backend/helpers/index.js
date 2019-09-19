const crypto = require('crypto')
const db = '../../db/users.json'
const session = '../../db/session.json'
const fs = require('fs')

module.exports = {
  mimeType: {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  },

  hashPassword: async(password)=>{
    try{
      let mykey = await crypto.createCipher('aes-128-cbc', 'mypassword');
      let mystr = await mykey.update(password, 'utf8', 'hex')
      mystr += mykey.final('hex')
      return mystr
    }catch(err){console.log(err)}
  },

  decryptPw: async(password)=>{
    try{
      var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
      var mystr = mykey.update(password, 'hex', 'utf8')
      mystr += mykey.final('utf8');
      return mystr
    }catch(err){console.log(err)}
  },

  locateUser: (username, password)=>{
    fs.readFile(db, 'utf8', async(err, data)=>{
      if(err) throw err
      let obj = JSON.parse(data)
      let allUsers = obj["users"]
      let foundUser
      let usersLen = allUsers.length
      for(let user of allUsers){
        if(user["email"] === email){
          let decryptPassword = await decryptPw(user["password"])
          if(decryptPassword === password){
            console.log('found user')
            fs.readFile(session, 'utf8', (err, sessionData)=>{
              if(err)throw err
              let obj = JSON.parse(sessionData)
              foundUser = user
              obj.user = user
              let json = JSON.stringify(obj, null, 3)
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
            return -1
          }
        }
        --usersLen
      }
    })
  }
}
