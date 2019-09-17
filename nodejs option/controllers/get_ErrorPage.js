const getErrorPage = (req, res, code) =>{
  const error = code === 404 ? 'Resource not found' : code === 405 ? 'Method not found' : code === 413 ? "Too many requests" : code === 401 ? "You need to be logged in to view the dashboard": code === 403 ? "Incorrect combination or missing credentials":"An Error Occured"
  const errorColor = code === 404 ? 'yellow' : code === 405 ? 'red' : 'purple'
  res.writeHead(code, {"Content-Type": "text/html"})
  res.write(`
    <html>
      <head>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <title>Error Page</title>
      </head>
      <body style="background: ${errorColor};">
        <h1>${error}. <a href="/">Go Back Home</a></h1>
      </body>
    </html>`)
  res.end()
}

exports.errorPage = getErrorPage