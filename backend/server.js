const http=require('http')
const {router} = require('./router')


http.createServer(router).listen(8000, ()=>{
  console.log(`server listening on port 8000`)
})