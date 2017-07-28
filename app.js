const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: false,
    cookie: { 
        //secure: true,
        httpOnly: true,
        maxAge: 10000 },
    rolling: true
  }),
  sharedsession = require("express-socket.io-session");
 /* Routes */
const index = require('./routes/index')
const admin = require('./routes/admin')
const socket = require('./routes/socket')
const api = require('./routes/api')

io.use(sharedsession(session))

app.set('views','./views')

app.set('view engine','ejs')

app.use(express.static('./public'))

app.use('/',index)

app.use('/api',api)

app.use('/admin',admin)

io.on("connection",socket)








const port = process.env.PORT || 3000

server.listen(port,() => {

	console.log("server runing port " + port)

})