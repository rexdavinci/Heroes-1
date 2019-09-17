const {landingPage, registerPage, loginPage, dashBoardPage, postLogin, postRegister, postSignout} =require('../controllers')
const {errorPage} = require('../controllers/get_ErrorPage')
const router = (req, res)=>{
  const {url, method} = req
  console.log(method, '-', url)
  switch(method){
    case 'GET':
      url === '/' ? landingPage(req, res) : 
      url === '/login' ? loginPage(req, res) : 
      url === '/dashboard' ? dashBoardPage(req, res) : 
      url=== '/register' ? registerPage(req, res) : 
      url === '/signout' ? postSignout(req, res) : 
      errorPage(req, res, 404)
      break
    case 'POST':
      url === '/login' ? postLogin(req, res) : url === '/register' ? postRegister(req, res) : errorPage(req, res, 403)
      break
    default:
      errorPage(req, res, 405)
      break
  }
}

exports.router = router