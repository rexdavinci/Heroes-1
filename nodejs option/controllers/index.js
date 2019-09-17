const fs = require('fs')

const {getLoginPage} = require('./get_LoginPage')
const {getDashboardPage} = require('./get_DashboardPage')
const {getLandingPage} = require('./get_LandingPage')
const {getRegisterPage} = require('./get_RegisterPage')
const {getErrorPage} = require('./get_ErrorPage')
const {postLogin} = require('./post_Login')
const {postRegister} = require('./post_Register')
const {postSignout} = require('./postSignout')



exports.errorPage = getErrorPage




module.exports = {
  landingPage: getLandingPage,
  registerPage: getRegisterPage,
  loginPage: getLoginPage,
  dashBoardPage: getDashboardPage,
  postLogin: postLogin,
  postRegister: postRegister,
  postSignout: postSignout
}