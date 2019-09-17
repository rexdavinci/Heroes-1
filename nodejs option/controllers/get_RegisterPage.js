exports.getRegisterPage= (req, res) =>{
  res.writeHead(200, {"Content-Type": "text/html"})
  res.write(`
    <html>
      <head>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <title>Login Page</title>
      </head>
      <body>
        <form action="/register" method='POST'>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username"/>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password"/>
          <label for="fullName">Full name:</label>
          <input type="text" id="fullName" name="fullName"/>
          <input type="submit" value="Submit"/>
        </form>
      </body>
    </html>`)
  res.end()
}