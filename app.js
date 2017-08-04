const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const session = require("express-session")({
  secret: 'sooper_secret',
  resave: false,
  saveUninitialized: false
}),
  sharedsession = require("express-socket.io-session");
const sha512 = require('sha512')


const md5 = require('md5')

const shortid = require('shortid')

 /* Routes */
const index = require('./routes/index')
const admin = require('./routes/admin')
const socket = require('./routes/socket')
const user = require('./routes/user')


app.use(session)

app.use(bodyParser.urlencoded({
    extended: true
}));
io.use(sharedsession(session))

app.set('views','./views')

app.set('view engine','ejs')

app.use(express.static('./public'))

app.use(express.static('./node_modules'))

app.use('/',index)

app.use('/admin',admin)

app.use('/auth',user)

io.on("connection",socket)







const port = process.env.PORT || 3000

server.listen(port,() => {

	console.log("server runing port " + port)

})






// // or more concisely

// var sys = require('sys')

// var exec = require('child_process').exec;

// function puts(error, stdout, stderr) { sys.puts(stdout) }

// exec("./z.sh", puts);