var express = require('express')

var app = express()

app.get('/', (req,res) => {
	res.render('index')
})
app.get('/userfiles',(req,res) => {
	res.send('aaaa')
})



module.exports = app