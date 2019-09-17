exports.getLandingPage = (req, res) =>{
  res.writeHeader(200, {"Content-Type": "text/html"})
  res.write(`
    <html>
      <head>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <title>Landing Page</title>
      </head>
      <body>
        <p>Signup here: <a href='/register'>Signup</a></p>
        <p>Login here <a href='/login'>Login</a></p>
      </body>
      </html>`)
  res.end()
}