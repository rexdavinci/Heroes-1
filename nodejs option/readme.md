## Nodejs implementation of a login page
### basic features

1. No third party libraries used, no frameworks used

2. Server is created using nodejs http module which is also responsible for routing

3. Upon starting the server, model directory containing registered users file and session file containing logged in use info are created if they do not already exist - fs module

4. static html files are served to the client - http module

5. User can signup and data is stored using the file system - fs module

6. Password is encodes using nodejs crypto module

7. When a user is signed in, a session is created and user information is parsed to the automatically redirected dashboard - fs module and http module

8. When a user signs out, session file is destroyed - fs module


## How to start the server
1. clone this directory
2. If you don't already have node installed, visit [node.js](https://nodejs.org)
3. run `node server.js` from the root directory
4. enter 'localhost:8000' on your browser
5. nodejs console might give some useful feedbacks